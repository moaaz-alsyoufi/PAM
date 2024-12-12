import { useState } from "react";

const useSiteMovement = () => {
  const [hasActions, _] = useState<boolean>(false);

  const columns = {
    id: "ID",
    site: "Site",
    beneficiary: "Beneficiary",
    subcontract: "Subcontract",
    ref_no: "Ref No",
    item: "Item",
    unit: "Unit",
    qte: "Qty",
    date: "Date",
  };
  const tableData = [
    {
      id: "1",
      site: "MAR-H",
      beneficiary: "MBT",
      subcontract: "CS-MAR-H-04",
      ref_no: "BS-A16-0149",
      item: "Ciment 45",
      unit: "T",
      qte: "0.1",
      date: "11-12-2024",
    },
    {
      id: "2",
      site: "MAR-H",
      beneficiary: "MBT",
      subcontract: "CS-MAR-H-04",
      ref_no: "BS-A16-0149",
      item: "Ciment 45",
      unit: "T",
      qte: "0.1",
      date: "11-12-2024",
    },
    {
      id: "3",
      site: "MAR-H",
      beneficiary: "MBT",
      subcontract: "CS-MAR-H-04",
      ref_no: "BS-A16-0149",
      item: "Ciment 45",
      unit: "T",
      qte: "0.1",
      date: "11-12-2024",
    },
    {
      id: "4",
      site: "MAR-H",
      beneficiary: "MBT",
      subcontract: "CS-MAR-H-04",
      ref_no: "BS-A16-0149",
      item: "Ciment 45",
      unit: "T",
      qte: "0.1",
      date: "11-12-2024",
    },
    {
      id: "5",
      site: "MAR-H",
      beneficiary: "MBT",
      subcontract: "CS-MAR-H-04",
      ref_no: "BS-A16-0149",
      item: "Ciment 45",
      unit: "T",
      qte: "0.1",
      date: "11-12-2024",
    },
  ];

  const inputFields: any[] = [];

  return {
    columns,
    tableData,
    inputFields,
    hasActions,
  };
};

export default useSiteMovement;
