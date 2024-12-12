import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useRequests from "./use-requests";

const Requests = () => {
  const { columns, tableData, inputFields } = useRequests();
  return (
    <div>
      <PageMetaData title={"Requests"} />

      <PageTitle title={"Requests"} subMenu={"Dashboard"} center="Operations" />
      <div>
        <PAMTable
          columns={columns}
          tableData={tableData}
          inputFields={inputFields}
          actions={true}
        />
      </div>
    </div>
  );
};

export default Requests;
