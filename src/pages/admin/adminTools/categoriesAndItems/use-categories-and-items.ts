import { useState } from "react";

const useCostCodeLibrary = () => {
  const [hasActions, _] = useState<boolean>(true);

  const columns = {
    id: "ID",
    category: "Category",
    item: "Item",
    unit: "Unit",
  };
  const tableData = [
    {
      id: "1",
      category: "Acier Constr.",
      item: "METAL DEPLOYE 2000 x 1500mm",
      unit: "U",
    },
    {
      id: "2",
      category: "Acier Constr.",
      item: "METAL DEPLOYE 2000 x 1500mm",
      unit: "U",
    },
    {
      id: "3",
      category: "Acier Constr.",
      item: "METAL DEPLOYE 2000 x 1500mm",
      unit: "U",
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

export default useCostCodeLibrary;
