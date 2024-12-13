import { useState } from "react";

const useCostCodeLibrary = () => {
  const [hasActions, _] = useState<boolean>(false);

  const columns = {
    id: "ID",
    sr: "Sr#",
    en: "EN",
    fr: "FR",
    code: "Code",
  };
  const tableData = [
    {
      id: "1",
      sr: "123",
      en: "Accessories",
      fr: "Accessoires",
      code: "03010209",
    },
    {
      id: "2",
      sr: "123",
      en: "Accessories",
      fr: "Accessoires",
      code: "03010209",
    },
    {
      id: "3",
      sr: "123",
      en: "Accessories",
      fr: "Accessoires",
      code: "03010209",
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
