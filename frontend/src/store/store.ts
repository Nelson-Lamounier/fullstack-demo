import { configureStore, Middleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSageMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";
import { PersistConfig, persistStore, persistReducer } from "redux-persist";



const sagaMiddleware = createSageMiddleware();

interface PersistedStore {
  cart: any;
}


// Configure persist setting with type safety
type ExtendedPersistConfig = PersistConfig<ReturnType<typeof rootReducer>> & {
  whitelist: (keyof PersistedStore)[];
};

const persistConfig: ExtendedPersistConfig ={
    key: "root",
    storage,
    whitelist: ["cart"]
}
// create the persisted reducer using reduc-persist
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure middleware
const middleWares: Middleware[] = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter(Boolean) as Middleware[];

// Create the store using configureStore
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions for serializable checks
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(middleWares),
    devTools: process.env.NODE_ENV !== "production"
});

// Create the store using configureStore
// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDe)
// })

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

