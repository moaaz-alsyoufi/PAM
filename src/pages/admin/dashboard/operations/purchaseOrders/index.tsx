import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const PurchaseOrders = () => {
  return (
    <div>
      <PageMetaData title={"Purchase Orders"} />

      <PageTitle
        title={"Purchase Orders"}
        subMenu={"Dashboard"}
        center="Operations"
      />
      <div>
        <PAMTable />
      </div>
    </div>
  );
};

export default PurchaseOrders;
