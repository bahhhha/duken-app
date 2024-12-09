import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";

interface TextareaProps extends TextAreaProps {
  label: string;
  textareaClassNames?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  textareaClassNames = "",
  ...textareaProps
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Input.TextArea
        className={`rounded-lg border-gray-300 ${textareaClassNames}`}
        {...textareaProps}
      />
    </div>
  );
};
