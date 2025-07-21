import Button from "components/button/Button";
import { LuMenu } from "react-icons/lu";
import { useGlobalStore } from "shared/lib/store/useGlobalStore";

const GettingStartedPage = () => {
  const { setDashboardHidden } = useGlobalStore();
  return (
    <div className="p-4 h-full">
      <div className="h-full w-full bg-white rounded-lg">
        <div className="px-4 py-10 flex justify-between">
          <h2 className="text-[24px] font-medium">
            Getting Started with NexLink CLI
          </h2>

          <Button
            className="lg:!hidden"
            onClick={() => setDashboardHidden((prev) => !prev)}
          >
            <LuMenu />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedPage;
