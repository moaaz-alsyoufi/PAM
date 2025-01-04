import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useSuppliers from "./use-suppliers";

const Sites = () => {
  const { columns, tableData, inputFields, hasActions } = useSuppliers();
  return (
    <div>
      <PageMetaData title={"Sites"} />

      <PageTitle title={"Sites"} subMenu={"Admin tools"} center="Branch Data" />
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

export default Sites;
