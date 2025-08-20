import { TbRefresh } from "react-icons/tb";

type Props = {
  refetcher: () => void;
};

const RefetchButton = ({ refetcher }: Props) => {
  return (
    <button
      type="button"
      onClick={refetcher}
      className="min-w-[32px] w-[32px] h-[32px] border-[2px] border-blue-600 rounded-full flex items-center justify-center"
    >
      <TbRefresh className="text-[24px] text-blue-600" />
    </button>
  );
};

export default RefetchButton;
