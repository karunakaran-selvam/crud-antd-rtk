import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Loader from "../app/componets/Loader";

const Loadable = (Component) => (props) => (
  <React.Suspense fallback={<Loader />}>
    <Component {...props} />
  </React.Suspense>
);

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

const ProductList = Loadable(React.lazy(() => import('../app/pages/Product/ProductList')));
const NotFound = Loadable(React.lazy(() => import('../app/pages/NotFound')));
