const TransferCard = () => (
  <div className="bg-white rounded-2xl p-6 shadow-md">
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-sm font-semibold text-gray-700">Favourite Transfers</h2>
      <span className="text-xs text-blue-600 cursor-pointer">See All</span>
    </div>
    <div className="space-y-3">
      {[
        { name: 'Sumi', img: 'https://i.pravatar.cc/36?img=5' },
        { name: 'Madhu', img: 'https://i.pravatar.cc/36?img=4' },
        { name: 'Ram', img: 'https://i.pravatar.cc/36?img=4' }
      ].map((user, i) => (
        <div key={i} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-xl">
          <img src={user.img} className="w-9 h-9 rounded-full" alt={user.name} />
          <span className="text-sm text-gray-800">{user.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default TransferCard;
