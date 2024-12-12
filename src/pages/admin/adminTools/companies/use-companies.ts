import { useState } from "react";

const useCompanies = () => {
  const [hasActions, _] = useState<boolean>(true);

  const columns = {
    id: "ID",
    country_name: "Country Name",
    country_icon: "Country Icon",
  };
  const tableData = [
    {
      id: "1",
      country_name: "SEG MA",
      country_icon: "",
    },
    {
      id: "2",
      country_name: "SEG MA",
      country_icon: "",
    },
    {
      id: "3",
      country_name: "SEG MA",
      country_icon: "",
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

export default useCompanies;
