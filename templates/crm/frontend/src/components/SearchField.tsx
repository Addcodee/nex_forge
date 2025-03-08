import { Input, InputProps } from "antd";
import { LuSearch } from "react-icons/lu";

interface Props extends InputProps {}

const SearchField = ({ className, ...rest }: Props) => {
  return (
    <Input
      placeholder="Поиск..."
      prefix={<LuSearch />}
      className={`max-w-[500px] ${className}`}
      {...rest}
    />
  );
};

export default SearchField;
