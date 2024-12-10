import ProductStock from "@/modules/Admin/components/productStock/ProductStock.jsx";
import { Outlet } from "react-router-dom";
import AdminLayout from "@/components/adminLayout/AdminLayout.jsx";
import Sidebar from "@/modules/Admin/components/Sidebar.jsx";

const ProductStockPage = () => {
  return (
    <>
      <Outlet />
      <AdminLayout />
      <div className="flex">
        <Sidebar className="w-1/5 max-w-[240px]" />
        <div className="bg-[#F5F6FA] p-10 flex-col w-full">
          <h1 className="text-[32px] font-medium text-left mb-2">
            Product Stock
          </h1>
          <ProductStock />
        </div>
      </div>
    </>
  );
};

export default ProductStockPage;
