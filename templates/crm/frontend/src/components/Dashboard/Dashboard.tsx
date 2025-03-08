import "./styles.css";
import logo from "shared/assets/icons/nexlink.svg";
import { LuArrowLeftToLine, LuLogOut } from "react-icons/lu";
import { Button } from "antd";
import { useLocation, useNavigate } from "react-router";
import { PAGES } from "shared/lib/consts/pages";
import { useGlobalStore } from "shared/lib/store/useGlobalStore";
import { logout } from "shared/lib/functions/logout";
import { useCurrentWidth } from "shared/lib/hooks/useCurrentWidth";

const Dashboard = () => {
  const {
    dashboardCollapsed,
    setDashboardCollapsed,
    dashboardHidden,
    setDashboardHidden,
  } = useGlobalStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { windowWidth } = useCurrentWidth();

  const toggleCollapsed = () => {
    setDashboardCollapsed((prev) => !prev);
    if (windowWidth < 1024) {
      setDashboardHidden(false);
    }
  };

  const isDashboardHidden =
    windowWidth < 1024 && dashboardHidden === false ? "hidden" : "";

  return (
    <div
      className={`${
        dashboardCollapsed ? "dashboard-collapsed" : "dashboard-uncollapsed"
      } bg-white flex flex-col lg:static fixed h-full z-20 lg:shadow-none shadow-2xl ${isDashboardHidden}`}
    >
      <div className="flex items-center justify-between h-[50px] px-4 overflow-hidden relative">
        <div className="flex items-center relative">
          <img
            className="absolute z-10 min-w-[29px] h-[34px]"
            src={logo}
            alt="NexLink"
          />
          <h2
            className={`${
              dashboardCollapsed ? "title-fade" : "title-unfade"
            } text-[24px] font-medium ml-[37px]`}
          >
            NexLink
          </h2>
        </div>
        <button
          onClick={toggleCollapsed}
          className="text-[24px] absolute right-4"
        >
          <LuArrowLeftToLine
            className={dashboardCollapsed ? "arrowRight" : "arrowLeft"}
          />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-0.5 p-4">
          {PAGES.map((item) => (
            <Button
              onClick={() => navigate(item.path)}
              type={pathname === item.path ? "primary" : "text"}
              className={`!justify-start text-start`}
            >
              <div
                className={`${
                  dashboardCollapsed ? "icon-centered" : "icon-uncentered"
                } relative z-10`}
              >
                {item.icon ? <item.icon className="text-[16px]" /> : null}
              </div>
              <span
                className={`${
                  dashboardCollapsed ? "title-fade" : "title-unfade"
                } text-[16px]`}
              >
                {item.label}
              </span>
            </Button>
          ))}
        </div>
        <div className="p-4">
          <Button
            onClick={logout}
            className={`!justify-start text-start w-full`}
            type="primary"
            danger
          >
            <div
              className={`${
                dashboardCollapsed ? "icon-centered" : "icon-uncentered"
              } relative z-10`}
            >
              <LuLogOut />
            </div>
            <span
              className={`${
                dashboardCollapsed ? "title-fade" : "title-unfade"
              } text-[16px]`}
            >
              Выйти
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
