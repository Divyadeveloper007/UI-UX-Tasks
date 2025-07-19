import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', transactions: 4000 },
  { name: 'Feb', transactions: 3000 },
  { name: 'Mar', transactions: 5000 },
  { name: 'Apr', transactions: 2780 },
  { name: 'May', transactions: 1890 },
  { name: 'Jun', transactions: 2390 },
]

export default function TransactionChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow h-80">
      <h3 className="font-bold text-lg mb-4">Monthly Transactions</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="transactions" fill="#1E40AF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}