import { Loader } from "../Loader";
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
    options?: string[]; // changed type
  }>;
  title?: string;
  loading?: boolean;
}

const PAMTable: React.FC<PAMTableProps> = ({
  columns,
  tableData,
  actions,
  inputFields,
  title,
  loading,
}) => {
  return (
    <div className="mt-5">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="hidden md:block">
            <TableComponent
              columns={columns}
              tableData={tableData}
              actions={actions}
              inputFields={inputFields}
              title={title}
            />
          </div>

          {/* Accordion for Mobile */}
          <div className="block md:hidden">
            <AccordionComponent
              columns={columns}
              accordionData={tableData}
              actions={actions}
              inputFields={inputFields}
              title={title}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PAMTable;
