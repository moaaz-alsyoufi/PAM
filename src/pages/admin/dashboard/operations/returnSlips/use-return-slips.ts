import { useState } from "react";

const useReturnSlips = () => {
  const [hasActions, _] = useState<boolean>(true);

  const columns = {
    id: "ID",
    return_slip: "Return Slip",
    po: "PO",
    amount_returned: "Amount Returned",
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

export default useReturnSlips;
