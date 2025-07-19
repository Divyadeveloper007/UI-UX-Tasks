import { useState } from 'react';
import { CreditCard, DollarSign, Settings, User, Home, Send } from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
  { name: 'Dashboard', icon: <Home size={20} /> },
  { name: 'My Accounts', icon: <User size={20} /> },
  { name: 'My Cards', icon: <CreditCard size={20} /> },
  { name: 'Fund Transfer', icon: <Send size={20} /> },
  { name: 'Bill Payment', icon: <DollarSign size={20} /> },
  { name: 'Settings', icon: <Settings size={20} /> },
];

const Sidebar = () => {
  const [active, setActive] = useState('Dashboard');

  return (
    <div className="bg-[#0D1028] text-white h-screen w-64 flex flex-col">
      <div className="p-6 text-xl font-bold flex items-center space-x-2">
        {/* <img src="/logo.svg" className="w-6 h-6" alt="logo" /> */}
        <span>MD Bank</span>
      </div>
      <ul className="flex-1 mt-6 space-y-1">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => setActive(item.name)}
            className={clsx(
              'flex items-center px-6 py-3 cursor-pointer transition-colors',
              active === item.name ? 'bg-blue-600 text-white font-semibold rounded-l-lg' : 'hover:bg-gray-700'
            )}
          >
            <div className="mr-3">{item.icon}</div>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
