import { Outlet } from "react-router";
import Sidebar from "./navbar/Sidebar";

const NotesLayout = () => {
  return (
    <div className="w-full h-screen flex ">
      {/* Sidebar */}
      <div className="w-[19%] h-full">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default NotesLayout;
