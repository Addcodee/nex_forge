import { SwitchProps, Switch as AntSwitch } from "antd";

interface Props extends SwitchProps {}

const Switch = ({ ...rest }: Props) => {
  return <AntSwitch {...rest} />;
};

export default Switch;
