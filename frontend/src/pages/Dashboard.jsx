
import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";

import {
  getLeadsByStatus,
  getMonthlyRevenue,
  getLeadsPerSalesRep,
  getOverdueTasks,
} from "../api/dashboard.api";

import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard/ChartCard";
import LeadStatusChart from "../components/charts/LeadStatusChart";
import RevenueChart from "../components/charts/RevenueChart";
import SalesPerformanceChart from "../components/charts/SalesPerformanceChart";
import OverdueTasksTable from "../components/OverdueTasksTable";

const Dashboard = () => {
  const [leadStatus, setLeadStatus] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [salesPerf, setSalesPerf] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getLeadsByStatus(),
      getMonthlyRevenue(),
      getLeadsPerSalesRep(),
      getOverdueTasks(),
    ])
      .then(([ls, rev, sp, ot]) => {
        setLeadStatus(ls.data || []);
        setRevenue(rev.data || []);
        setSalesPerf(sp.data || []);
        setOverdueTasks(ot.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="muted-text">Loading…</p>;

  const totalLeads = leadStatus.reduce((s, i) => s + i.count, 0);
  const qualifiedLeads =
    leadStatus.find((l) => l.status === "qualified")?.count || 0;
  const totalRevenue = revenue.reduce((s, i) => s + i.amount, 0);

  return (
    <>
      {/* PAGE HEADER */}
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      {/* KPI CARDS */}
      <div className={styles.kpis}>
        <StatCard title="Total Leads" value={totalLeads} icon="👥" />
        <StatCard
          title="Qualified Leads"
          value={qualifiedLeads}
          icon="✅"
          accent="#16a34a"
        />
        <StatCard
          title="Total Revenue"
          value={`   ₹ ${totalRevenue}`}
          icon="💰"
          accent="#f59e0b"
        />
      </div>

      {/* CHARTS ROW */}
      <div className={styles.chartsGrid}>
        <ChartCard
          title="Leads by Status"
          subtitle="Current distribution of leads"
        >
          <LeadStatusChart data={leadStatus} />
        </ChartCard>

        <ChartCard
          title="Monthly Revenue"
          subtitle="Revenue trend over time"
        >
          <RevenueChart data={revenue} />
        </ChartCard>
      </div>

      {/* SALES PERFORMANCE */}
      <div className={styles.section}>
        <ChartCard
          title="Sales Performance"
          subtitle="Leads per Sales Representative"
        >
          <SalesPerformanceChart data={salesPerf} />
        </ChartCard>
      </div>

      {/* OVERDUE TASKS */}
      <div className={styles.section}>
        <OverdueTasksTable data={overdueTasks} />
      </div>
    </>
  );
};

export default Dashboard;
