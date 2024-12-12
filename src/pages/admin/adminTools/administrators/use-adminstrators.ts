import { useState } from "react";

const useAdminstrators = () => {
  const [hasActions, _] = useState<boolean>(false);

  const columns = {
    id: "ID",
    country: "Country",
    name: "Name",
    username: "Username",
    password: "Password",
    role: "Role",
  };
  const tableData = [
    {
      id: "1",
      country: "SEG MA	",
      name: "Georges CHEMAYA",
      username: "gchemaya",
      password: "",
      role: "Country Manager",
    },
    {
      id: "2",
      country: "SEG MA	",
      name: "Georges CHEMAYA",
      username: "gchemaya",
      password: "",
      role: "Country Manager",
    },
    {
      id: "3",
      country: "SEG MA	",
      name: "Georges CHEMAYA",
      username: "gchemaya",
      password: "",
      role: "Country Manager",
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

export default useAdminstrators;
