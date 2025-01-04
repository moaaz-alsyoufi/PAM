import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import usePaymentOrders from "./use-purchase-orders";

const PaymentOrders = () => {
  const { columns, tableData, inputFields, hasActions } = usePaymentOrders();

  return (
    <div>
      <PageMetaData title={"Payment Orders"} />

      <PageTitle
        title={"Payment Orders"}
        subMenu={"Dashboard"}
        center="Operations"
      />
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

export default PaymentOrders;
