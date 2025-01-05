import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useRequests from "./use-requests";
import { useAuthContext } from "@/states/auth";
import { Loader } from "@/components/Loader";
import { useDialog } from "@/components/daisyui";
import RequestDialog from "./components/RequestDialog";
import { useState } from "react";

const Requests = () => {
  const [dialogType, setDialogType] = useState<"Add" | "Edit" | "Preview">(
    "Add"
  );
  const [data, setData] = useState<any[]>([]);
  const [currentRow, setCurrentRow] = useState();
  const { getRequestDetails } = useRequests();
  const { authState } = useAuthContext();
  const { dialogRef, handleShow, handleHide } = useDialog();

  const siteId = authState.user?.siteid || 0;
  const {
    columns,
    tableData,
    inputFields,
    hasActions,
    loading,
    previewColumns,
  } = useRequests();

  const roleId = authState.user.roleid;

  const canMakeNewRequest =
    roleId === 4 || roleId === 5 || roleId === 7 || roleId === 10;

  const handleOpenDialog = async (
    type: "Add" | "Edit" | "Preview",
    row: any
  ) => {
    setDialogType(type);
    setCurrentRow(row);

    if (type === "Preview") {
      try {
        const details = await getRequestDetails(row.materialId);
        setData(details.details);
      } catch (error) {
        console.error(error);
      }
    }

    handleShow();
  };

  return (
    <div>
      <PageMetaData title={"Requests"} />

      <PageTitle title={"Requests"} subMenu={"Dashboard"} center="Operations" />
      {loading ? (
        <Loader />
      ) : (
        <div>
          {siteId === 0 ? (
            <p>Please select a valid site to view requests.</p>
          ) : tableData.length > 0 ? (
            <>
              <PAMTable
                columns={columns}
                tableData={tableData}
                inputFields={inputFields}
                title="Request"
                loading={loading}
                actions={hasActions}
                showAction={true}
                previewColumns={previewColumns}
                addBtn={canMakeNewRequest}
                dynamicDialog={false}
                openStaticDialog={handleOpenDialog}
              />

              <RequestDialog
                handleHide={handleHide}
                dialogRef={dialogRef}
                dialogType={dialogType}
                current={currentRow ?? {}}
                onSuccess={() => {}}
                inputFields={inputFields}
                title={
                  dialogType === "Edit"
                    ? "Edit Request"
                    : dialogType === "Add"
                      ? "New Request"
                      : "Request Details"
                }
                previewColumns={previewColumns}
                data={data}
              />
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Requests;
