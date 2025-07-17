interface FormFieldProps {
  label?: string;
  children: React.ReactNode;
  isRequire?: boolean;
  error?: string;
}
const FormFiled = ({
  label = "",
  children,
  isRequire,
  error,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-secondary text-sm">
        {label} {isRequire ? <span className="text-red-500">*</span> : ""}
      </span>
      {children}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default FormFiled;
