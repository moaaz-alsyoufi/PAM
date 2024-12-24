import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const Tutorials = () => {
  return (
    <div>
      <PageMetaData title={"Tutorials"} />
      <PageTitle subMenu="Dashboard" title="Tutorials" />

      <div>
        <PAMTable
          columns={{}}
          tableData={[]}
          actions={true}
          inputFields={[]}
        />
      </div>
    </div>
  );
};

export default Tutorials;
