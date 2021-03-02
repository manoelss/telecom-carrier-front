import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./ducks";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store =
  process.env.NODE_ENV === "development"
    ? createStore(
      persistedReducer,
      composeWithDevTools(applyMiddleware(thunk))
    )
    : createStore(
      persistedReducer, 
      applyMiddleware(thunk)
    );

export const persistor = persistStore(store);