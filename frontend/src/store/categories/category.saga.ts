import { takeLatest, all, call, put } from "typed-redux-saga/macro";
import { getCategoriesAndDocuments } from "../../api/category.api";

import {
  fetchCategoryFailed,
  fetchCategoryStart,
  fetchCategorySuccess,
} from "./category.slice";

/**
 * Worker saga to handle fetching categories.
 */
export function* fetchCategoryAsync() {
  try {
    // Call the API with the category from the action payload
    const categoriesArray = yield* call(getCategoriesAndDocuments);
    // Dispatch success action with the fetched categories
    yield* put(fetchCategorySuccess(categoriesArray));
  } catch (error) {
    // Dispatch failure action with the error message
    yield* put(fetchCategoryFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(fetchCategoryStart.type, fetchCategoryAsync);
}

export function* categorySage() {
  yield* all([call(onFetchCategories)]);
}
