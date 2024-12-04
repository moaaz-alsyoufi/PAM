import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import MyTable from "@/components/Table";

const Users = () => {
  return (
    <div>
      <PageMetaData title={"Users"} />

      <PageTitle title={"Users"} subMenu={"Dashboard"} />
      <div>
        <MyTable />
      </div>
    </div>
  );
};

export default Users;
