const useRequests = () => {
  const columns = {
    id: "ID",
    request: "Request",
    pm_approved: "PM Approved",
    status: "Status",
    date: "Date",
    ordered_percent: "Ordered %",
    deliv_percent: "Deliv.%",
  };
  const tableData = [
    {
      id: "1",
      request: "REQ-A16-0026-CM",
      pm_approved: "True",
      status: "PO in Progress",
      date: "25-11-2024",
      ordered_percent: "100.00%",
      deliv_percent: "0.00%",
    },
    {
      id: "2",
      request: "REQ-A16-0026-CM",
      pm_approved: "True",
      status: "PO in Progress",
      date: "25-11-2024",
      ordered_percent: "100.00%",
      deliv_percent: "0.00%",
    },
    {
      id: "3",
      request: "REQ-A16-0026-CM",
      pm_approved: "True",
      status: "PO in Progress",
      date: "25-11-2024",
      ordered_percent: "100.00%",
      deliv_percent: "0.00%",
    },
    {
      id: "4",
      request: "REQ-A16-0026-CM",
      pm_approved: "True",
      status: "PO in Progress",
      date: "25-11-2024",
      ordered_percent: "100.00%",
      deliv_percent: "0.00%",
    },
    {
      id: "5",
      request: "REQ-A16-0026-CM",
      pm_approved: "True",
      status: "PO in Progress",
      date: "25-11-2024",
      ordered_percent: "100.00%",
      deliv_percent: "0.00%",
    },
  ];

  const inputFields: any[] = [];

  return {
    columns,
    tableData,
    inputFields,
  };
};

export default useRequests;
