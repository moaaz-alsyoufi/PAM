import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useCostCodeLibrary from "./use-cost-code-library";

const CostCodeLibrary = () => {
  const { columns, tableData, inputFields, hasActions } = useCostCodeLibrary();

  return (
    <div>
      <PageMetaData title={"Cost Code Library"} />

      <PageTitle title={"Cost Code Library"} subMenu={"Admin tools"} />
      <div>
        <PAMTable
          columns={columns}
          tableData={tableData}
          inputFields={inputFields}
          actions={hasActions}
        />
      </div>
    </div>
  );
};

export default CostCodeLibrary;
