import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useUsers from "./use-users";

const Users = () => {
  const { columns, tableData, inputFields, hasActions } = useUsers();

  return (
    <div>
      <PageMetaData title={"Users"} />

      <PageTitle title={"Users"} subMenu={"Admin tools"} center="Branch Data" />
      <div>
        <PAMTable
          columns={columns}
          tableData={tableData}
          inputFields={inputFields}
          actions={hasActions}
          title={""}
        />
      </div>
    </div>
  );
};

export default Users;
