import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useadminstrators from "./use-adminstrators";

const Administrators = () => {
  const { columns, tableData, inputFields, hasActions } = useadminstrators();

  return (
    <div>
      <PageMetaData title={"Administrators"} />

      <PageTitle title={"Administrators"} subMenu={"Admin tools"} />
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

export default Administrators;
