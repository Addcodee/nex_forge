import { ButtonProps } from "antd";
import Button from "../button/Button";
import { FaEye } from "react-icons/fa";

interface Props extends ButtonProps {}

const ReviewButton = ({ ...rest }: Props) => {
  return (
    <Button {...rest}>
      <FaEye className="text-[16px] text-blue-600" />
    </Button>
  );
};

export default ReviewButton;
