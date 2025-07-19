import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const data = [
  { name: 'Salary', value: 120000 },
  { name: 'Utilities', value: 25000 },
  { name: 'Maintenance', value: 10000 },
  { name: 'Loans', value: 30000 },
  { name: 'Miscellaneous', value: 5000 },
];

const COLORS = ['#6366F1', '#22C55E', '#F59E0B', '#EF4444', '#06B6D4'];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, value
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;

  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#1F2937" className="text-base font-semibold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#6B7280" className="text-sm">
        ₹ {value.toLocaleString()}
      </text>
      <circle cx={cx} cy={cy} r={outerRadius + 12} fill="#E5E7EB" opacity={0.3} />
      <Pie
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const Chart = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => setActiveIndex(index);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-base font-semibold text-gray-800 mb-1">Breakdown of monthly bank expenses</h2>
      
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`₹ ${value.toLocaleString()}`, name]}
            contentStyle={{ fontSize: '13px' }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Custom Legend */}
      <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-700">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center text-sm  gap-2">
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
