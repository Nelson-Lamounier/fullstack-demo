import { createSelector } from "reselect";

import { Category, CategoryMap,  } from "./category.slice";
import { RootState } from "../store";

// Selector to get the category slice
const selectCategoryReducer = (state: RootState) => state.categories;

// Selector to get all products
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categorySlice): Category[] => categorySlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories], (categories): CategoryMap => categories.reduceRight((acc, category) => {
        const { title, items} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {} as CategoryMap)
)

// Selector to check if data is loading
export const selectIsLoading = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.isLoading
);

export const selectError = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.error
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
