import Dashboard from "components/dashboard";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-slate-200">
      <Dashboard />
      <div className="flex-1 h-full overflow-hidden overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
