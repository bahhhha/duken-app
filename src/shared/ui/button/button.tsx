import { Button as AntButton, ButtonProps } from "antd";

interface ExtendedButtonProps extends ButtonProps {
  buttonClassNames?: string;
}

const Button: React.FC<ExtendedButtonProps> = ({
  buttonClassNames = "",
  ...props
}) => {
  return (
    <AntButton
      style={{
        height: "2rem",
        width: "100%",
      }}
      {...props}
      className={buttonClassNames}
    >
      {props.children}
    </AntButton>
  );
};

export { Button };
