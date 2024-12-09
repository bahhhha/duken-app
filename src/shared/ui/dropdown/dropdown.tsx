import { Select } from "antd";
import { SelectProps } from "antd/es/select";
import { ReactNode } from "react";

interface DropdownProps extends SelectProps<string> {
  items: {
    value: string;
    label: string;
    icon?: ReactNode | string;
  }[];
}

const Dropdown: React.FC<DropdownProps> = ({ items, ...selectProps }) => {
  return (
    <div className="relative inline-block w-36">
      <Select
        {...selectProps}
        dropdownRender={(menu) => (
          <div className="bg-white rounded-md shadow-md">{menu}</div>
        )}
        optionLabelProp="label"
        className="w-full"
      >
        {items.map((item) => (
          <Select.Option
            key={item.value}
            value={item.value}
            label={item.label}
            className="flex items-center gap-2 text-sm"
          >
            {item.icon && (
              <span className="w-6 h-6 flex items-center justify-center">
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export { Dropdown };
