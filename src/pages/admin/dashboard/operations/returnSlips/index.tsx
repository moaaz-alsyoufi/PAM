import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const ReturnSlips = () => {
  return (
    <div>
      <PageMetaData title={"Return Slips"} />

      <PageTitle
        title={"Return Slips"}
        subMenu={"Dashboard"}
        center="Operations"
      />
      <div>
        <PAMTable />
      </div>
    </div>
  );
};

export default ReturnSlips;
