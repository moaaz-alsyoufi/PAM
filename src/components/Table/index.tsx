import { Loader } from "../Loader";
import AccordionComponent from "./Components/Accordion";
import TableComponent from "./Components/Table";

interface PAMTableProps {
  columns: Record<string, string>;
  previewColumns?: Record<string, string>;
  tableData: any[];
  inputFields: Array<{
    name: string;
    label: string;
    type: string;
    required: boolean;
    options?: string[]; // changed type
  }>;
  actions: boolean;
  showAction?: boolean;
  deleteAction?: boolean;
  editAction?: boolean;
  title?: string;
  loading?: boolean;
}

const PAMTable: React.FC<PAMTableProps> = ({
  columns,
  previewColumns,
  tableData,
  inputFields,
  actions,
  showAction,
  deleteAction,
  editAction,
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
              showAction={showAction}
              deleteAction={deleteAction}
              editAction={editAction}
              previewColumns={previewColumns}
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
              showAction={showAction}
              deleteAction={deleteAction}
              editAction={editAction}
              previewColumns={previewColumns}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PAMTable;
