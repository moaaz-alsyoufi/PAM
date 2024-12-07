import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const Sites = () => {
  return (
    <div>
      <PageMetaData title={"Sites"} />

      <PageTitle title={"Sites"} subMenu={"Admin tools"} center="Branch Data" />
      <div>
        <PAMTable />
      </div>
    </div>
  );
};

export default Sites;
