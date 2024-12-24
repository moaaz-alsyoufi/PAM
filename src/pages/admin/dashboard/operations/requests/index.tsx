import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useRequests from "./use-requests";
import { useAuthContext } from "@/states/auth"; // Import useAuthContext

const Requests = () => {
  const { authState } = useAuthContext(); // Access authState
  const siteId = authState.user?.siteid || 0; // Get siteId
  const token = authState.user?.token || ""; // Get token
  console.log("Requests Component - siteId:", siteId, "token:", token); // Added log
  const { columns, tableData, inputFields, hasActions } = useRequests(siteId, token); // Pass siteId and token

  return (
    <div>
      <PageMetaData title={"Requests"} />

      <PageTitle title={"Requests"} subMenu={"Dashboard"} center="Operations" />
      <div>
        {siteId === 0 ? (
          <p>Please select a valid site to view requests.</p>
        ) : tableData.length > 0 ? (
          <PAMTable
            columns={columns}
            tableData={tableData}
            inputFields={inputFields}
            actions={hasActions}
          />
        ) : (
          <p>No data available</p> // Ensure this message is conditional
        )}
      </div>
    </div>
  );
};

export default Requests;
