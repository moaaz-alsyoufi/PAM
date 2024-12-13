import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useCategoriesAndItems from "./use-categories-and-items";

const CategoriesAndItems = () => {
  const { columns, tableData, inputFields, hasActions } =
    useCategoriesAndItems();

  return (
    <div>
      <PageMetaData title={"Categories And Items"} />

      <PageTitle title={"Categories And Items"} subMenu={"Admin tools"} />
      <div>
        <PAMTable
          columns={columns}
          tableData={tableData}
          inputFields={inputFields}
          actions={hasActions}
        />
      </div>
    </div>
  );
};

export default CategoriesAndItems;
