import { useState } from "react";
import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import { Loader } from "@/components/Loader";
import { useDialog } from "@/components/daisyui";
import { useAuthContext } from "@/states/auth";
import useStockOut from "./useStockOut";
import StockOutDialog from "@/components/StockOutDialog";

const StockOutPage = () => {
  const [dialogType, setDialogType] =
    useState<"Add" | "Edit" | "Preview" | "Select" | null>(null);
  const [currentRow, setCurrentRow] = useState<any>(null);

  const { columns, tableData, loading, exportStockOut, reloadData } = useStockOut();
  const { authState } = useAuthContext();
  const { dialogRef, handleShow, handleHide } = useDialog();

  const siteId = authState.user?.siteid || 0;
  const roleId = authState.user?.roleid;
  const canStockOut =
    roleId === 4 || roleId === 5 || roleId === 7 || roleId === 10;

  const handleOpenDialog = async (
    type: "Add" | "Edit" | "Preview" | "Select",
    row?: any
  ) => {
    setDialogType(type);
    setCurrentRow(row || null);

    if (type === "Preview" && row) {
      // Print / PDF preview
      try {
        const pdfBlob = await exportStockOut(row.outId);
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
      } catch (err) {
        console.error("Error printing OutStock:", err);
        alert("Failed to print stock out. See console for details.");
      }
      return;
    }

    // "Add" or "Edit" => open the dialog
    handleShow();
  };

  const handleSuccess = async () => {
    await reloadData();
    handleHide();
  };

  const handleCloseDialog = () => {
    handleHide();
  };

  return (
    <div>
      <PageMetaData title="Stock Out" />
      <PageTitle title="Stock Out" subMenu="Dashboard" center="Operations" />

      {loading ? (
        <Loader />
      ) : (
        <div>
          {siteId === 0 ? (
            <p>Please select a valid site to view stock out data.</p>
          ) : tableData.length > 0 ? (
            <>
              <PAMTable
                columns={columns}
                tableData={tableData}
                title="Stock Out"
                loading={loading}
                actions={true}
                showAction={true}
                addBtn={canStockOut}
                dynamicDialog={false}
                openStaticDialog={handleOpenDialog}
                inputFields={[]}
              />

              {(dialogType === "Add" || dialogType === "Edit") && (
                <StockOutDialog
                  dialogRef={dialogRef}
                  dialogType={dialogType}
                  current={currentRow}
                  handleHide={handleCloseDialog}
                  onSuccess={handleSuccess}
                />
              )}
            </>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StockOutPage;