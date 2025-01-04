// import React from "react";
import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useSiteStock from "./use-site-stock";
import { Loader } from "@/components/Loader";

const SiteStock = () => {
  const { columns, tableData, inputFields, hasActions, loading } =
    useSiteStock();

  return (
    <div>
      <PageMetaData title={"Site Stock"} />

      <PageTitle title={"Site Stock"} subMenu={"Dashboard"} center="Reports" />
      <div>
        {loading ? (
          <Loader />
        ) : (
          <PAMTable
            columns={columns}
            tableData={tableData}
            inputFields={inputFields}
            actions={hasActions}
            title={""}
          />
        )}
      </div>
    </div>
  );
};

export default SiteStock;
