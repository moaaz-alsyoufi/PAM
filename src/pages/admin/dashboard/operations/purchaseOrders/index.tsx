import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import usePurchaseOrders from "./use-purchase-orders";

const PurchaseOrders = () => {
  const { columns, tableData, inputFields, hasActions } = usePurchaseOrders();

  return (
    <div>
      <PageMetaData title={"Purchase Orders"} />

      <PageTitle
        title={"Purchase Orders"}
        subMenu={"Dashboard"}
        center="Operations"
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

export default PurchaseOrders;
