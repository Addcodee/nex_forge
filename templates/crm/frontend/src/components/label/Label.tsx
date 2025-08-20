type Props = {
  label?: string;
  children?: React.ReactNode;
  htmlFor?: string;
};

const Label = ({ label, children, htmlFor }: Props) => {
  return (
    <div className="flex flex-col gap-1 min-w-[220px]">
      {label ? (
        <label
          htmlFor={htmlFor}
          className="text-slate-800 text-[14px] font-medium"
        >
          {label}
        </label>
      ) : null}
      {children}
    </div>
  );
};

export default Label;
