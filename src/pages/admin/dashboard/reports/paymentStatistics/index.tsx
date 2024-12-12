import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import usePaymentOrders from "../../operations/paymentOrders/use-purchase-orders";

const PaymentStatistics = () => {
  const { columns, tableData, inputFields, hasActions } = usePaymentOrders();
  return (
    <div>
      <PageMetaData title={"Payment Statistics"} />

      <PageTitle
        title={"Payment Statistics"}
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

export default PaymentStatistics;
