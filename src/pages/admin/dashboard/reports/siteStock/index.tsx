import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useSiteStock from "./use-site-stock";

const SiteStock = () => {
  const { columns, tableData, inputFields, hasActions } = useSiteStock();

  return (
    <div>
      <PageMetaData title={"Site Stock"} />

      <PageTitle title={"Site Stock"} subMenu={"Dashboard"} center="Reports" />
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

export default SiteStock;
