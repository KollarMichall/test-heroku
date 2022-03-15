import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import persistStore from "redux-persist/es/persistStore";
import rootReducer from "./root-reducer";
import thunk from 'redux-thunk'

const middlewares = [logger, thunk]

export const store = createStore(rootReducer, applyMiddleware(...middlewares))
export const persistor = persistStore(store)

