import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";

const CategoriesAndItems = () => {
  return (
    <div>
      <PageMetaData title={"Categories And Items"} />

      <PageTitle title={"Categories And Items"} subMenu={"Admin tools"} />
      <div>
        <PAMTable />
      </div>
    </div>
  );
};

export default CategoriesAndItems;
