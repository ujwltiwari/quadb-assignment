import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/App.jsx";
import ShopHome from "@/modules/Shop/screens/ShopHome.jsx";
import ProductDetails from "@/modules/Product/screens/ProductDetails.jsx";
import AddProduct from "@/modules/Product/AddProduct/AddProduct.jsx";
import Admin from "@/Admin.jsx";
import ProductsPage from "@/modules/Product/screens/ProductsPage.jsx";
import EditProduct from "@/modules/Product/EditProduct/EditProduct.jsx";
import SignUpPage from "@/modules/Auth/screees/SignUp.jsx";
import LoginPage from "@/modules/Auth/screees/Login.jsx";
import ProfilePage from "@/modules/profile/screens/ProfilePage.jsx";
import CartCheckoutPage from "@/modules/Cart/screens/CartCheckoutPage.jsx";
import ProtectedRoute from "@/routes/ProtectedRoute.jsx";
import CartPage from "@/modules/Cart/screens/CartPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/shop",
    element: <ShopHome />,
  },
  {
    path: "/shop/:id",
    element: <ProductDetails />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute adminOnly={true}>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <ProtectedRoute adminOnly={true}>
        <ProductsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/create",
    element: (
      <ProtectedRoute adminOnly={true}>
        <AddProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/product/:id",
    element: (
      <ProtectedRoute adminOnly={true}>
        <EditProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <CartPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cart/checkout",
    element: (
      <ProtectedRoute>
        <CartCheckoutPage />
      </ProtectedRoute>
    ),
  },
]);

const RoutesComponent = () => {
  return <RouterProvider router={router} />;
};

export default RoutesComponent;
