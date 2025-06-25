import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  PolarAngleAxis
} from "recharts";

const data = [
  { name: "Mens Rs.30,000", uv: 70, fill: "#005226" },
  { name: "Womens Rs.20,000", uv: 50, fill: "#003927" },
  { name: "Kids Rs.10,000", uv: 40, fill: "#80FFD6" },
  { name: "Accessories Rs.10,000", uv: 30, fill: "#BFFFEA" },
];

const renderCustomLegend = () => {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {data.map((entry, index) => (
        <li
          key={`item-${index}`}
          style={{ marginBottom: 8, display: "flex", alignItems: "center" }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: entry.fill,
              marginRight: 8,
              borderRadius: "50%",
            }}
          />
          <span style={{ fontSize: 14 }}>{entry.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default function RadialBarRevenueChart() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <ResponsiveContainer >
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="30%"
          outerRadius="100%"
          barSize={15}
          data={[...data].reverse()}
          startAngle={180}
          endAngle={-180}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            clockWise
            dataKey="uv"
            cornerRadius={10}
            label={false}
          />
          <Legend
            iconSize={10}
            verticalAlign="middle"
            align="right"
            layout="vertical"
            content={renderCustomLegend}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      {/* Centered Label */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "18px",
          fontWeight: "600",
          color: "#005226",
        }}
      >
        Dress
      </div>
    </div>
  );
}
