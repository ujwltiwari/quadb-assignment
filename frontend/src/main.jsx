import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShopHome from "@/modules/Shop/screens/ShopHome.jsx";
import ProductDetails from "@/modules/Product/screens/ProductDetails.jsx";
import AddProduct from "@/modules/Product/AddProduct/AddProduct.jsx";
import Admin from "@/Admin.jsx";
import ProductsPage from "@/modules/Product/screens/ProductsPage.jsx";
import EditProduct from "@/modules/Product/EditProduct/EditProduct.jsx";
import SignUpPage from "@/modules/Auth/screees/SignUp.jsx";
import LoginPage from "@/modules/Auth/screees/Login.jsx";
import ProfilePage from "@/modules/profile/screens/ProfilePage.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import CartPage from "@/modules/Cart/screens/CartPage.jsx";
import CartCheckoutPage from "@/modules/Cart/screens/CartCheckoutPage.jsx";
import ProtectedRoute from "@/routes/ProtectedRoute.jsx";
import ProductStock from "@/modules/Admin/components/productStock/ProductStock.jsx";
import ProductStockPage from "@/modules/Admin/screens/productStock/ProductStockPage.jsx";
import OrderConfirmationPage from "@/modules/Cart/screens/OrderConfirmationPage.jsx";

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
    path: "/admin/product-stock",
    element: (
      <ProtectedRoute adminOnly={true}>
        <ProductStockPage />
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
    element: <CartPage />,
  },
  {
    path: "/cart/checkout",
    element: <CartCheckoutPage />,
  },
  {
    path: "/cart/order-confirmation",
    element: <OrderConfirmationPage />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
