import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useRequests from "./use-requests";
import { useAuthContext } from "@/states/auth";
import { Loader } from "@/components/Loader";
import DialogComponent from "@/components/Table/Components/Dialog";
import { useDialog } from "@/components/daisyui";

const Requests = () => {
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
    roleId === 1 ||
    roleId === 4 ||
    roleId === 5 ||
    roleId === 7 ||
    roleId === 10;

  const handleOpenDialog = (type: string, data: any) => {
    console.log(type);
    console.log(data);
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

              <DialogComponent
                handleHide={handleHide}
                dialogRef={dialogRef}
                dialogType={"Add"}
                current={{}}
                onSuccess={() => {}} // Pass success handler
                inputFields={inputFields}
                title=""
              />
            </>
          ) : (
            <p>No data available</p> // Ensure this message is conditional
          )}
        </div>
      )}
    </div>
  );
};

export default Requests;
