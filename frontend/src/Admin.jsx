import { Outlet } from "react-router-dom";
import AdminHome from "@/modules/Admin/screens/home/AdminHome.jsx";
import AdminLayout from "@/components/adminLayout/AdminLayout.jsx";
import Sidebar from "@/modules/Admin/components/Sidebar.jsx";

const Admin = () => {
  return (
    <>
      <Outlet />
      <AdminLayout />
      <div className="flex">
        <Sidebar className="w-1/5 max-w-[240px]" />
        <div className="bg-[#F5F6FA] p-10 flex-col">
          <h1 className="text-[32px] font-medium text-left">Dashboard</h1>
          <AdminHome />
        </div>
      </div>
    </>
  );
};

export default Admin;
