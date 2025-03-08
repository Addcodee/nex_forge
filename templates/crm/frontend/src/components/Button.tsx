import { ButtonProps, Button as AntButton } from "antd";

interface Props extends ButtonProps {}

const Button = ({ ...rest }: Props) => {
  return <AntButton {...rest} />;
};

export default Button;
