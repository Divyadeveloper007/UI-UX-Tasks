import { Bell, LogOut, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white px-6 py-4 flex justify-between items-center border-b shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800">Good Morning <span className="ml-1">👋</span></h1>

      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <div className="relative">
          <Bell className="text-gray-500" />
          <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full">2</span>
        </div>

        {/* Avatar & Name */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={toggleDropdown}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img
              src="https://i.pravatar.cc/40?img=32"
              className="w-9 h-9 rounded-full"
              alt="profile"
            />
            <span className="text-gray-700 font-medium">Kathryn</span>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg border z-10">
              <ul className="py-2 text-sm text-gray-700">
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <User className="w-4 h-4 mr-2" /> Profile
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
