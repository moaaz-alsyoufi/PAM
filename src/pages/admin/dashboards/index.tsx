import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";

import CounterWidget from "./components/CounterWidget";
import RevenueChart from "./components/RevenueChart";
import VisitorChart from "./components/VisitorChart";

const Dashboard = () => {
  return (
    <div>
      <PageMetaData title={"Dashboard - PAM"} />
      <PageTitle title={"Overview"} subMenu={"Dashboard"} />
      <div className="mt-6">
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          <CounterWidget />
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <RevenueChart />
          </div>
          <div className="xl:col-span-5">
            <VisitorChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
