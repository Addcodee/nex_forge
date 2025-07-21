import { FaPencil } from "react-icons/fa6";
import Button from "../button/Button";
import { ButtonProps } from "antd";

interface Props extends ButtonProps {}

const EditButton = ({ ...rest }: Props) => {
  return (
    <Button {...rest} type="primary">
      <FaPencil className="text-[16px]" />
    </Button>
  );
};

export default EditButton;
