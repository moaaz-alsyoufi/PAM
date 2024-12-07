import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const Companies = () => {
  return (
    <div>
      <PageMetaData title={"Companies"} />

      <PageTitle title={"Companies"} subMenu={"Admin tools"} />
      <div>
        <PAMTable />
      </div>
    </div>
  );
};

export default Companies;
