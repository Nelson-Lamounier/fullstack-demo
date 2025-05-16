import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Category from "../pages/shop/Category";
import { fetchCategoryStart } from "../store/categories/category.slice";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryStart());
  }, [dispatch]);

  return (
    <Routes>
      <Route path=":category" element={<Category/>} />
    </Routes>
  );
};

export default Shop;
