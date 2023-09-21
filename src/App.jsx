import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsFilter from "./pages/ProductsFilter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:id" element={<ProductsFilter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
