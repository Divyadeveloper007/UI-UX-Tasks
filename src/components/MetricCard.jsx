
export default function MetricCard({ title, value, change, icon }) {
  return (
<div className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.015] group">
  <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
      <p className={`mt-2 text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? `↑ ${change}%` : `↓ ${Math.abs(change)}%`} from last month
      </p>
    </div>
  );
}
