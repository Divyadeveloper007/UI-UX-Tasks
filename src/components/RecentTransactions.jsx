export default function RecentTransactions() {
  const transactions = [
    { id: 1, account: '**** 4582', amount: '$1,250.00', date: 'Today, 10:45 AM', type: 'Deposit' },
    { id: 2, account: '**** 3621', amount: '$750.00', date: 'Today, 9:30 AM', type: 'Withdrawal' },
    { id: 3, account: '**** 7854', amount: '$2,450.00', date: 'Yesterday', type: 'Deposit' },
    { id: 4, account: '**** 1254', amount: '$150.00', date: 'Yesterday', type: 'Transfer' },
    { id: 5, account: '**** 4582', amount: '$350.00', date: 'Jul 15', type: 'Withdrawal' },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex justify-between items-center border-b pb-3">
            <div>
              <p className="font-medium">{tx.type} • {tx.account}</p>
              <p className="text-sm text-gray-500">{tx.date}</p>
            </div>
            <p className={`font-bold ${tx.type === 'Deposit' ? 'text-green-500' : 'text-red-500'}`}>
              {tx.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}