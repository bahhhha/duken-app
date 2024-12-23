import { useTheme } from "@/shared/hooks/useTheme";

interface TagProps {
  checked?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({
  checked = false,
  onClick,
  children,
}) => {
  const theme = useTheme();
  return (
    <button
      onClick={onClick}
      className="px-2 h-6 text-xs rounded-full border"
      style={{
        backgroundColor: checked ? theme?.primaryColor : "white",
        color: checked ? "white" : "black",
      }}
      type="button"
    >
      {children}
    </button>
  );
};
