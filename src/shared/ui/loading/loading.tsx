import { Spin } from "antd";

interface LoadingProps {
  size?: "small" | "default" | "large";
}

const Loading = ({ size = "default" }: LoadingProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spin size={size} />
    </div>
  );
};

export { Loading };
