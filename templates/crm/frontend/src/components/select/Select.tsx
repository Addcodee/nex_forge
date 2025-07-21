import { SelectProps, Select as AntSelect } from "antd";

interface Props extends SelectProps {}

const Select = ({ ...rest }: Props) => {
  return <AntSelect {...rest} />;
};

export default Select;
