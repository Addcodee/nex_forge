import { Input as AntInput, InputProps } from "antd";
import Label from "components/label";

interface Props extends InputProps {
  label?: string;
}

const Input = ({ label, className, name, id, ...rest }: Props) => {
  return (
    <Label htmlFor={id} label={label}>
      <AntInput
        id={id}
        name={name}
        className={`!w-full ${className}`}
        {...rest}
      />
    </Label>
  );
};

export default Input;
