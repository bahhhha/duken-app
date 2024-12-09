import { Input as AntdInput, InputProps as AntdInputProps } from "antd";

interface InputProps extends AntdInputProps {
  label: string;
  inputClassNames?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  inputClassNames = "",
  ...inputProps
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <AntdInput
        className={`rounded-lg border-gray-300 ${inputClassNames}`}
        {...inputProps}
      />
    </div>
  );
};
