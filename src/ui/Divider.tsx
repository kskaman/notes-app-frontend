const Divider = ({
  orientation = "horizontal",
}: {
  orientation?: "horizontal" | "vertical";
}) => (
  <hr
    role="separator"
    className={`
      border-none 
      bg-(--divider)
      ${orientation === "horizontal" ? "w-full h-[1px]" : "h-full w-[1px]"}
    `}
  />
);

export default Divider;
