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
  title: string;
  dynamicDialog?: boolean;
  openStaticDialog?: (
    type: "Add" | "Edit" | "Preview" | "Select",
    Data?: any
  ) => void;
  showAction?: boolean;
  deleteAction?: boolean;
  editAction?: boolean;
  loading?: boolean;
  addBtn?: boolean;
  select?: boolean;
  onRowSelect?: (selectedRow: any) => void; // Add this prop
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
  addBtn,
  dynamicDialog,
  openStaticDialog,
  onRowSelect,
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
              addBtn={addBtn}
              dynamicDialog={dynamicDialog}
              openStaticDialog={openStaticDialog}
              onRowSelect={onRowSelect}
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
              addBtn={addBtn}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PAMTable;
