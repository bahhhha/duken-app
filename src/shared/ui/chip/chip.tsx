interface ChipProps {
  chipClassName?: string;
  children: React.ReactNode;
}

export const Chip = ({
  chipClassName,
  children,
  ...props
}: ChipProps): JSX.Element => {
  return (
    <div
      {...props}
      className={`w-full h-[2rem] bg-white border py-2 text-xs border-zinc-600 text-md font-semibold rounded-md flex items-center justify-center cursor-default border-opacity-30 ${chipClassName}`}
    >
      {children}
    </div>
  );
};
