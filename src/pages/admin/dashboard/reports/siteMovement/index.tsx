import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const SiteMovement = () => {
  return (
    <div>
      <PageMetaData title={"Site Movement"} />

      <PageTitle
        title={"Site Movement"}
        subMenu={"Dashboard"}
        center="Reports"
      />
      <div>
        <PAMTable />
      </div>
    </div>
  );
};

export default SiteMovement;
