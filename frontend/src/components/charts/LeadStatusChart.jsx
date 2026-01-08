// import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

// const LeadStatusChart = ( { data }) => {
//     return (
//         <div>
//             <h3>Leads by Status</h3>
//             <BarChart width={500} height={300} data={data}>
//                 <XAxis dataKey="_id" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="count" />
//             </BarChart>
//         </div>
//     )
// }

// export default LeadStatusChart;

import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const LeadStatusChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No lead data</p>;

  return (
    <div>
      {/* <h3>Leads by Status</h3> */}
      <PieChart width={300} height={250}>
        <Pie data={data} dataKey="count" nameKey="status" outerRadius={80}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default LeadStatusChart;
