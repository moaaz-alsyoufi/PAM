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
  const [reqRemarks, setReqRemarks] = useState<string>("");
  const [costCodes, setCostCodes] = useState<any[]>([]);
  const [subcontractors, setSubcontractors] = useState<any[]>([]);
  const [requestRefNb, setRequestRefNb] = useState<any>(null);
  const [currentRow, setCurrentRow] = useState();
  const { getRequestDetails, getCostCodes, getSubcontractors } = useRequests();
  const { authState, roleHasAccess } = useAuthContext();
  const { dialogRef, handleShow, handleHide } = useDialog();
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const siteId = authState.user?.siteid || 0;
  const {
    columns,
    tableData,
    inputFields,
    hasActions,
    loading,
    previewColumns,
    fetchNewRequestData,
    getRequests,
  } = useRequests();

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
        setTimeout(() => {
          setShowDialog(true);
          setTimeout(() => {
            handleShow();
          });
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (type === "Edit") {
      try {
        const details = await getRequestDetails(row.materialId);
        console.log("details", details);
        setData(details.details);
        setReqRemarks(details.request.remarks);
        setRequestRefNb({ refNumber: details.request.refNo });

        const cc = await getCostCodes();
        setCostCodes(cc);

        const subs = await getSubcontractors();
        setSubcontractors(subs);

        setTimeout(() => {
          setShowDialog(true);
          setTimeout(() => {
            handleShow();
          });
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (type === "Preview") {
      try {
        const details = await getRequestDetails(row.materialId);
        setData(details.details);
        setShowDialog(true);
        setTimeout(() => {
          handleShow();
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSuccess = async (type: any) => {
    if (type === "Add" || type === "Edit") {
      await getRequests();
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
                editAction={roleHasAccess}
                previewColumns={previewColumns}
                addBtn={roleHasAccess}
                dynamicDialog={false}
                openStaticDialog={handleOpenDialog}
              />

              {showDialog && (
                <RequestDialog
                  handleHide={handleHide}
                  dialogRef={dialogRef}
                  dialogType={dialogType}
                  current={currentRow ?? {}}
                  onSuccess={handleSuccess}
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
                  reqRemarks={reqRemarks}
                />
              )}
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
