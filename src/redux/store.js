import { combineReducers,createStore } from "redux";
import { authReducer,menusReducer } from "./reducers/login";
const rootReducer=combineReducers({authReducer,menusReducer})
const store=createStore(rootReducer)


export default store