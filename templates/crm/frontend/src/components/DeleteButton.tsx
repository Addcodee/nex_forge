import { FaTrash } from "react-icons/fa6";
import Button from "./Button";
import { ButtonProps } from "antd";

interface Props extends ButtonProps {}

const DeleteButton = ({ ...rest }: Props) => {
  return (
    <Button {...rest} danger type="primary">
      <FaTrash className="text-[16px]" />
    </Button>
  );
};

export default DeleteButton;
