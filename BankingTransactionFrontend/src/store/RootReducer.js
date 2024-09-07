import { combineReducers } from "redux";
import accountReducer from "./reducers/AccountReducer";

const rootReducer = combineReducers({
    account: accountReducer
})

export default rootReducer;