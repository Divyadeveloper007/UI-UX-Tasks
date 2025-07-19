import TransferCard from "../components/TransferCard";
import TransactionTable from "../components/TransactionTable";
import Chart from "../components/Chart";
import MetricCard from "../components/MetricCard";
import MoneyFlowChart from "../components/MoneyFlowChart";
import {
  FiDollarSign,
  FiTrendingUp,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";
import TransactionChart from "../components/TransactionChart";
import RecentTransactions from "../components/RecentTransactions";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* First Row: Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Balance"
          value="$124,567.89"
          change={2.5}
          icon={<FiDollarSign size={20} />}
        />
        <MetricCard
          title="Active Accounts"
          value="1,245"
          change={5.2}
          icon={<FiUsers size={20} />}
        />
        <MetricCard
          title="New Customers"
          value="87"
          change={12.4}
          icon={<FiUserPlus size={20} />}
        />
        <MetricCard
          title="Total Revenue"
          value="$45,230.00"
          change={8.7}
          icon={<FiTrendingUp size={20} />}
        />
      </div>

      {/* Second Row: Recent Transactions + Money Flow Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionChart />
        <TransactionTable />
      </div>

      {/* Other Charts and Tables */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        <MoneyFlowChart />
        <RecentTransactions />

        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
