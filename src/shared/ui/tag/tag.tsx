import { Tag as AntdTag } from "antd";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export const Tag = ({ children }: TagProps) => {
  const text = children as string;
  return <AntdTag>{text?.at(0)?.toUpperCase() + text.slice(1)}</AntdTag>;
};
