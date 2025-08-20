import { SelectProps, Select as AntSelect } from "antd";
import Label from "components/label";
import RefetchButton from "components/refetch-button";

interface Props extends SelectProps {
  label?: string;
  refetcher?: () => void;
}

const Select = ({ label, refetcher, ...rest }: Props) => {
  return (
    <Label label={label}>
      <div className="flex items-center gap-1">
        <AntSelect className="!w-full" {...rest} />
        {refetcher ? <RefetchButton refetcher={refetcher} /> : null}
      </div>
    </Label>
  );
};

export default Select;
