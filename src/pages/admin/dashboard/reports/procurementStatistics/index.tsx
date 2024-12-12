import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useProcurementStatistics from "./use-procurement-statistics";

const ProcurementStatistics = () => {
  const { columns, tableData, inputFields, hasActions } =
    useProcurementStatistics();

  return (
    <div>
      <PageMetaData title={"Procurement Statistics"} />

      <PageTitle
        title={"Procurement Statistics"}
        subMenu={"Dashboard"}
        center="Reports"
      />
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

export default ProcurementStatistics;
