import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const ProcurementStatistics = () => {
  return (
    <div>
      <PageMetaData title={"Procurement Statistics"} />

      <PageTitle
        title={"Procurement Statistics"}
        subMenu={"Dashboard"}
        center="Reports"
      />
      <div>
        <PAMTable />
      </div>
    </div>
  );
};

export default ProcurementStatistics;
