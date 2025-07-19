import Navbar from './layout/Navbar';
import Sidebar from './layout/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-auto bg-gray-50">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
