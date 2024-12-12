import { useState } from "react";

const useSite = () => {
  const [hasActions, _] = useState<boolean>(true);

  const columns = {
    id: "ID",
    city: "City",
    site_code: "Site Code",
    site_name: "Site Name",
    acronym: "Acronym",
    is_closed: "Is Closed?",
  };
  const tableData = [
    {
      id: "1",
      city: "Bertoua",
      site_code: "A06",
      site_name: "Bertoua CHR",
      acronym: "BER-H",
      is_closed: "No",
    },
    {
      id: "2",
      city: "Bertoua",
      site_code: "A06",
      site_name: "Bertoua CHR",
      acronym: "BER-H",
      is_closed: "No",
    },
    {
      id: "3",
      city: "Bertoua",
      site_code: "A06",
      site_name: "Bertoua CHR",
      acronym: "BER-H",
      is_closed: "No",
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

export default useSite;
