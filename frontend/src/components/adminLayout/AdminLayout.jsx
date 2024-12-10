import AdminHeader from "@/components/adminLayout/AdminHeader.jsx";

const AdminLayout = ({ children, className }) => {
  return (
    <>
      <AdminHeader />
      <div className={className ?? ""}>{children}</div>
    </>
  );
};

export default AdminLayout;
