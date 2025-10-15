const Toast = ({
  message,
}: {
  status: "success" | "error" | "info";
  message: string;
}) => {
  return (
    <div
      className="text-preset-6 
        text-(--toast-text) bg-(--toast-bg)
        p-2 rounded-[8px] 
        flex flex-row items-center gap-2
        h-[32px] w-[300px]"
    >
      {message}
    </div>
  );
};

export default Toast;
