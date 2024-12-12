import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useSiteMovement from "./use-site-movement";

const SiteMovement = () => {
  const { columns, tableData, inputFields, hasActions } = useSiteMovement();

  return (
    <div>
      <PageMetaData title={"Site Movement"} />

      <PageTitle
        title={"Site Movement"}
        subMenu={"Dashboard"}
        center="Reports"
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

export default SiteMovement;
