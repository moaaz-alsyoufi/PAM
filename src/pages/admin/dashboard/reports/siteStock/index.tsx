import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const SiteStock = () => {
  return (
    <div>
      <PageMetaData title={"Site Stock"} />

      <PageTitle title={"Site Stock"} subMenu={"Dashboard"} center="Reports" />
      <div>
        <PAMTable />
      </div>
    </div>
  );
};

export default SiteStock;
