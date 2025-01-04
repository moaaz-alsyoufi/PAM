import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useReturnSlips from "./use-return-slips";

const ReturnSlips = () => {
  const { columns, tableData, inputFields, hasActions } = useReturnSlips();

  return (
    <div>
      <PageMetaData title={"Return Slips"} />

      <PageTitle
        title={"Return Slips"}
        subMenu={"Dashboard"}
        center="Operations"
      />
      <div>
        <PAMTable
          columns={columns}
          tableData={tableData}
          inputFields={inputFields}
          actions={hasActions}
          title={""}
        />
      </div>
    </div>
  );
};

export default ReturnSlips;
