import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const Administrators = () => {
  return (
    <div>
      <PageMetaData title={"Administrators"} />

      <PageTitle title={"Administrators"} subMenu={"Admin tools"} />
      <div>
        <PAMTable />
      </div>
    </div>
  );
};

export default Administrators;
