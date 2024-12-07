import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const CostCodeLibrary = () => {
  return (
    <div>
      <PageMetaData title={"Cost Code Library"} />

      <PageTitle title={"Cost Code Library"} subMenu={"Admin tools"} />
      <div>
        <PAMTable />
      </div>
    </div>
  );
};

export default CostCodeLibrary;
