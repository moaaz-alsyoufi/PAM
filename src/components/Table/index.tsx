import AccordionComponent from "./Components/Accordion";
import TableComponent from "./Components/Table";

interface PAMTableProps {
  columns: Record<string, string>;
  tableData: any[];
  actions: boolean;
  inputFields: Array<{
    name: string;
    label: string;
    type: string;
    required: boolean;
    options?: [];
  }>;
}

const PAMTable: React.FC<PAMTableProps> = ({
  columns,
  tableData,
  actions,
  inputFields,
}) => {
  return (
    <div className="mt-5">
      {/* Table for Desktop */}
      <div className="hidden md:block">
        <TableComponent
          columns={columns}
          tableData={tableData}
          actions={actions}
          inputFields={inputFields}
        />
      </div>

      {/* Accordion for Mobile */}
      <div className="block md:hidden">
        <AccordionComponent
          columns={columns}
          accordionData={tableData}
          actions={actions}
          inputFields={inputFields}
        />
      </div>
    </div>
  );
};

export default PAMTable;
