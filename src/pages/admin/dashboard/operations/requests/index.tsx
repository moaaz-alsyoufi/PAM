import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useRequests from "./use-requests";
import { useAuthContext } from "@/states/auth";
import { Loader } from "@/components/Loader";

const Requests = () => {
  const { authState } = useAuthContext();
  const siteId = authState.user?.siteid || 0;
  const {
    columns,
    tableData,
    inputFields,
    hasActions,
    loading,
    previewColumns,
  } = useRequests();
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
            <PAMTable
              columns={columns}
              tableData={tableData}
              inputFields={inputFields}
              title="Request"
              loading={loading}
              actions={hasActions}
              showAction={true}
              previewColumns={previewColumns}
              addBtn={true}
            />
          ) : (
            <p>No data available</p> // Ensure this message is conditional
          )}
        </div>
      )}
    </div>
  );
};

export default Requests;
