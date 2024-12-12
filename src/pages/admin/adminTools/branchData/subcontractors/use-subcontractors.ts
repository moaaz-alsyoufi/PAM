import { useState } from "react";

const useSubcontractors = () => {
  const [hasActions, _] = useState<boolean>(true);

  const columns = {
    id: "ID",
    site: "Site",
    trade: "Trade",
    subcontractor: "Subcontractor",
    contact_number: "Contact Number",
  };
  const tableData: any[] = [];

  const inputFields: any[] = [];

  return {
    columns,
    tableData,
    inputFields,
    hasActions,
  };
};

export default useSubcontractors;
