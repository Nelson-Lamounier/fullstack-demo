import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import { Category } from "../store/categories/category.slice";


export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/products`
    );
    if (!API_URL) {
  throw new Error("API URL is not defined in environment variables");
}
    return response.data; // Return the categories fetched from the backend
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};


