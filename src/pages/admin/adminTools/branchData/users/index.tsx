import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const Users = () => {
  return (
    <div>
      <PageMetaData title={"Users"} />

      <PageTitle title={"Users"} subMenu={"Admin tools"} center="Branch Data" />
      <div>
        <PAMTable />
      </div>
    </div>
  );
};

export default Users;
