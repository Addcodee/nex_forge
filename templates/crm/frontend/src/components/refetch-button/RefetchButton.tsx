import Button from "components/button";
import { TbRefresh } from "react-icons/tb";

type Props = {
  refetcher: () => void;
  loading?: boolean;
};

const RefetchButton = ({ loading, refetcher }: Props) => {
  return (
    <Button
      disabled={loading}
      htmlType="button"
      onClick={refetcher}
      className="!p-0 min-w-[32px] w-[32px] h-[32px] border-[2px] !border-blue-600 !rounded-full flex items-center justify-center"
    >
      <TbRefresh
        className={`text-[24px] !text-blue-600 ${
          loading ? "animate-spin" : ""
        }`}
      />
    </Button>
  );
};

export default RefetchButton;
