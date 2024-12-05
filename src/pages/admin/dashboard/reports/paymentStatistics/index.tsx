import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const PaymentStatistics = () => {
  return (
    <div>
      <PageMetaData title={"Payment Statistics"} />

      <PageTitle
        title={"Payment Statistics"}
        subMenu={"Dashboard"}
        center="Reports"
      />
      <div>
        <PAMTable />
      </div>
    </div>
  );
};

export default PaymentStatistics;
