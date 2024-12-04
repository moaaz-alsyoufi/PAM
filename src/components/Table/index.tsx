import AccordionComponent from "./Components/Accordion";
import TableComponent from "./Components/Table";

const MyTable = () => {
  const cols = ["col 1", "col 2", "col 3", "col 4", "col 5"];
  return (
    <>
      <div className="hidden md:block mt-5">
        <TableComponent columns={cols} data={[]} />
      </div>
      <div className="block md:hidden mt-5">
        <AccordionComponent />
      </div>
    </>
  );
};

export default MyTable;
