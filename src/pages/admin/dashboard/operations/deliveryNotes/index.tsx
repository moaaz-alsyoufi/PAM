import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useDeliveryNotes from "./use-delivery-notes";

const DeliveryNotes = () => {
  const { columns, tableData, inputFields, hasActions } = useDeliveryNotes();

  return (
    <div>
      <PageMetaData title={"Delivery Notes"} />

      <PageTitle
        title={"Delivery Notes"}
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

export default DeliveryNotes;
