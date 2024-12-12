import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useSubcontractors from "./use-subcontractors";

const Subcontractors = () => {
  const { columns, tableData, inputFields,hasActions } = useSubcontractors();


  return (
    <div>
      <PageMetaData title={"Subcontractors"} />

      <PageTitle
        title={"Subcontractors"}
        subMenu={"Admin tools"}
        center="Branch Data"
      />
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

export default Subcontractors;
