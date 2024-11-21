import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";

import UserTable from "./UserTable";
import UserAccordions from "./UserAccordion";

const Users = () => {
  return (
    <div>
      <PageMetaData title={"Users"} />

      <PageTitle title={"Customers"} subMenu={"Dashboard"} />
      <div className="mt-5 hidden md:inline">
        <UserTable />
      </div>
      <div className="mt-5 md:hidden">
        <UserAccordions />
      </div>
    </div>
  );
};

export default Users;
