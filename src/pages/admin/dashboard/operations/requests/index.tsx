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
  const [dialogType, setDialogType] = useState<
    "Add" | "Edit" | "Preview" | "Select"
  >("Add");
  const [data, setData] = useState<any[]>([]);
  const [costCodes, setCostCodes] = useState<any[]>([]);
  const [subcontractors, setSubcontractors] = useState<any[]>([]);
  const [requestRefNb, setRequestRefNb] = useState<any>(null);
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
    fetchNewRequestData,
  } = useRequests();

  const roleId = authState.user.roleid;

  const canMakeNewRequest =
    roleId === 4 || roleId === 5 || roleId === 7 || roleId === 10;

  const handleOpenDialog = async (
    type: "Add" | "Edit" | "Preview" | "Select",
    row: any
  ) => {
    setDialogType(type);
    setCurrentRow(row);

    if (type === "Add") {
      try {
        const data = await fetchNewRequestData();
        setData(data.itms);
        setCostCodes(data.cc);
        setSubcontractors(data.subs);
        setRequestRefNb(data.requestRefNb);
        handleShow();
      } catch (error) {
        console.error(error);
      }
    }

    if (type === "Preview") {
      try {
        const details = await getRequestDetails(row.materialId);
        setData(details.details);
        handleShow();
      } catch (error) {
        console.error(error);
      }
    }
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
                subContractors={subcontractors}
                costCodes={costCodes}
                requestRefNb={requestRefNb}
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
