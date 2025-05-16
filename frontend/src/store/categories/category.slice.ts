/*
Step 1: Use category.slice.ts to Manage State

The category.slice.ts file manages the state of the selected category and the list of products. 
actions like fetchCategoryStart, fetchCategorySuccess, 
and fetchCategoryFailed for managing the state.
*/
import { createSlice, PayloadAction, isAnyOf } from "@reduxjs/toolkit";

export interface CategoryItem {
  _id: number;
  ImageUrl: string;
  name: string;
  description: string;
  category: string;
  price: number;
}
// Define the shape of the state
export interface Category {
  title: string;
  items: CategoryItem[];
}

export type CategoryMap = {
  [key: string]: CategoryItem[];
};

// Define the state structure
export interface CategoryState {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: string | null | Error;
}
// Inital state with the defined type
export const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

// Define the slice
export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    // Action to handle successful fetch
    fetchCategoryStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    // Action to handle successful fetch
    fetchCategorySuccess(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    // Action to handle failed fetch
    fetchCategoryFailed(state, action: PayloadAction<Error>) {
      state.isLoading = false;
      state.error = action.payload.message;

    },
  },
  extraReducers: (builder) => {
    // Using matchers with Redux Saga actions
    builder.addMatcher(
      isAnyOf(fetchCategoryStart, fetchCategorySuccess, fetchCategoryFailed),
      (state, action) => {
        if (fetchCategoryStart.match(action)) {
          state.isLoading = true;
          state.error = null;
        } else if (fetchCategorySuccess.match(action)) {
          state.categories = action.payload as Category[];
          state.isLoading = false;
        } else if (fetchCategoryFailed.match(action)) {
          state.error = action.payload as Error;
          state.isLoading = false;
        }
      }
    );
  },
});

export const { fetchCategoryStart, fetchCategorySuccess, fetchCategoryFailed } =
  categorySlice.actions;

export const categoryReducer = categorySlice.reducer;

/*
Advantages of Using Matchers
1.	Consolidated Logic: Reduces boilerplate by handling multiple actions with shared logic in one place.
2.	Flexibility: You can integrate actions dispatched from sagas, thunks, or other middleware without directly coupling them to the slice.
3.	Scalability: As the application grows, you can add matchers for new actions without cluttering your slice logic.

*/
