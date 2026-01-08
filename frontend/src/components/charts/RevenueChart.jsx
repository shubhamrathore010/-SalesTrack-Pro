// import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";


// const RevenueChart = ({ data }) => {
//     const formatted = data.map(d => ({
//         month: `${d._id.month}/${d._id.year}`,
//         revenue: d.revenue
//     }));

//     return (
//         <div>
//             <h3>Monthly Revenue</h3>
//             <LineChart width={500} height={300} data={formatted}>
//                <XAxis dataKey="month" />
//                <YAxis />
//                <Tooltip />
//                <Line type="monotone" dataKey="revenue" />
//             </LineChart>
//         </div>
//     )
// }

// export default RevenueChart;

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const RevenueChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="muted-text">No revenue data</p>;
  }

  const formatted = data
    .filter(d => d && (d._id?.month || d.month))
    .map(d => ({
      month: d._id?.month ?? d.month,
      amount: d.amount ?? 0,
    }));

  if (formatted.length === 0) {
    return <p className="muted-text">No revenue data</p>;
  }

  return (
    <div className="card">
      {/* <h3>Monthly Revenue</h3> */}

      <LineChart width={500} height={300} data={formatted}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#2563eb"
          strokeWidth={2}
        />
      </LineChart>

       {/* <ul>
        {formatted.map(item => (
          <li key={item.month}>
            Month {item.month}: ₹ {item.amount}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default RevenueChart;
