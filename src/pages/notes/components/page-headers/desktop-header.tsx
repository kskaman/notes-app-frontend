const DesktopHeader = ({ heading }: { heading: string }) => {
  return (
    <header
      className="flex w-full flex items-center justify-between px-8
            h-[80px] border-b border-(--divider) shrink-0"
    >
      {/* desktop page header */}
      <h1 className="text-preset-1">{heading}</h1>
    </header>
  );
};

export default DesktopHeader;
