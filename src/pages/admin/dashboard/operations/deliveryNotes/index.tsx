import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const DeliveryNotes = () => {
  return (
    <div>
      <PageMetaData title={"Delivery Notes"} />

      <PageTitle
        title={"Delivery Notes"}
        subMenu={"Dashboard"}
        center="Operations"
      />
      <div>
        <PAMTable />
      </div>
    </div>
  );
};

export default DeliveryNotes;
