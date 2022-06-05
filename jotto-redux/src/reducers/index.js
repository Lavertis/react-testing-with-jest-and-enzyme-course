import {combineReducers} from "redux";
import successReducer from "./success/successReducer";

export default combineReducers({
    success: successReducer
});