import { Input, InputProps } from "antd";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useDebounce } from "use-debounce";

interface Props extends InputProps {
  onSearch: (value: string) => void;
}

const SearchField = ({ className, onSearch, ...rest }: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedValue] = useDebounce(searchValue, 500);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <Input
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Поиск..."
      prefix={<LuSearch />}
      className={`max-w-[500px] ${className}`}
      {...rest}
    />
  );
};

export default SearchField;
