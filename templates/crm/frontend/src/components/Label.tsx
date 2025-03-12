type Props = {
  label?: string;
  children?: React.ReactNode;
};

const Label = ({ label, children }: Props) => {
  return (
    <div className="flex flex-col">
      {label ? (
        <label className="text-slate-800 text-[14px]" htmlFor={label}>
          {label}
        </label>
      ) : null}
      <p className="text-[16px]" id={label}>
        {children}
      </p>
    </div>
  );
};

export default Label;
