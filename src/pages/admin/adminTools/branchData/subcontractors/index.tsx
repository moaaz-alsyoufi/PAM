import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const Subcontractors = () => {
  return (
    <div>
      <PageMetaData title={"Subcontractors"} />

      <PageTitle
        title={"Subcontractors"}
        subMenu={"Admin tools"}
        center="Branch Data"
      />
      <div>
        <PAMTable />
      </div>
    </div>
  );
};

export default Subcontractors;
