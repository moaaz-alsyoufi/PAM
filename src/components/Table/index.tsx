import AccordionComponent from "./Components/Accordion";
import TableComponent from "./Components/Table";

const PAMTable = () => {
  const columns = ["col 1", "col 2", "col 3", "col 4", "col 5"];
  const tableData = [
    {
      "col 1": "Alice",
      "col 2": 25,
      "col 3": "Engineer",
      "col 4": "New York",
      "col 5": 5,
    },
    {
      "col 1": "Bob",
      "col 2": 30,
      "col 3": "Designer",
      "col 4": "Los Angeles",
      "col 5": 3,
    },
    {
      "col 1": "Charlie",
      "col 2": 22,
      "col 3": "Developer",
      "col 4": "Chicago",
      "col 5": 4,
    },
  ];

  return (
    <div className="mt-5">
      {/* Table for Desktop */}
      <div className="hidden md:block">
        <TableComponent
          columns={columns}
          tableData={tableData}
          actions={true}
        />
      </div>

      {/* Accordion for Mobile */}
      <div className="block md:hidden">
        <AccordionComponent />
      </div>
    </div>
  );
};

export default PAMTable;
