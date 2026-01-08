// import { BarChart , Bar, XAxis, YAxis, Tooltip } from "recharts";

// const  SalesPerformanceChart = ({ data }) => {
//     return (
//       <div>
//         <h3>Leads per Sales Rep</h3>
//         <BarChart width={500} height={300} data={data}>
//            <XAxis  dataKey="salesRep"/>
//            <YAxis />
//            <Tooltip />
//            <Bar dataKey="totalLeads"/>
//         </BarChart>
//       </div>
//     )
// }

// export default SalesPerformanceChart;

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const SalesPerformanceChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="muted-text">No sales performance data</p>;
  }

  // Defensive formatting (backend-safe)
  const formatted = data
    .filter(d => d && (d.salesRep || d._id))
    .map(d => ({
      salesRep: d.salesRep ?? d._id,
      totalLeads: d.totalLeads ?? d.count ?? 0,
    }));

  if (formatted.length === 0) {
    return <p className="muted-text">No sales performance data</p>;
  }

  return (
    <div className="card">
      {/* <h3>Leads per Sales Representative</h3> */}

      <BarChart width={500} height={300} data={formatted}>
        <XAxis dataKey="salesRep" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalLeads" fill="#2563eb" />
      </BarChart>
    </div>
  );
};

export default SalesPerformanceChart;
