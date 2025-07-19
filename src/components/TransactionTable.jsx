const data = [
  { name: 'Jenny Wilson', id: '2425666', status: 'Money In', amount: '+$450.00', date: '20 Dec 22' },
  { name: 'Robert Fox', id: '2425665', status: 'Money Out', amount: '-$455.00', date: '20 Dec 22' },
  { name: 'Jacob Jones', id: '2425666', status: 'Money In', amount: '+$955.00', date: '20 Dec 22' },
];

const TransactionTable = () => (
  <div className="bg-white rounded-2xl p-6 shadow-md">
    <h2 className="text-sm font-semibold text-gray-700 mb-4">Transaction</h2>
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-100 text-gray-500 uppercase">
        <tr>
          <th className="p-2">Name</th>
          <th className="p-2">ID</th>
          <th className="p-2">Status</th>
          <th className="p-2">Amount</th>
          <th className="p-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((tx, i) => (
          <tr key={i} className="border-b">
            <td className="p-2 flex items-center space-x-2">
              <img src={`https://i.pravatar.cc/30?img=${i + 1}`} className="rounded-full" />
              <span>{tx.name}</span>
            </td>
            <td className="p-2">{tx.id}</td>
            <td className="p-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  tx.status === 'Money In' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {tx.status}
              </span>
            </td>
            <td className="p-2">{tx.amount}</td>
            <td className="p-2">{tx.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TransactionTable;
