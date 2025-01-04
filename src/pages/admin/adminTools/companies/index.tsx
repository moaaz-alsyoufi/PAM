import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useCompanies from "./use-companies";

const Companies = () => {
  const { columns, tableData, inputFields, hasActions } = useCompanies();

  return (
    <div>
      <PageMetaData title={"Companies"} />

      <PageTitle title={"Companies"} subMenu={"Admin tools"} />
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

export default Companies;
