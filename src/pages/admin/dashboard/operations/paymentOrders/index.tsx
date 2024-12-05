import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const PaymentOrders = () => {
  return (
    <div>
      <PageMetaData title={"Payment Orders"} />

      <PageTitle
        title={"Payment Orders"}
        subMenu={"Dashboard"}
        center="Operations"
      />
      <div>
        <PAMTable />
      </div>
    </div>
  );
};

export default PaymentOrders;
