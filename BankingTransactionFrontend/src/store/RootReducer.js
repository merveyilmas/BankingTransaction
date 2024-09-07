import { combineReducers } from "redux";
import accountReducer from "./reducers/AccountReducer";
import userReducer from "./reducers/UserReducer";

const rootReducer = combineReducers({
    account: accountReducer,
    user: userReducer
})

export default rootReducer;