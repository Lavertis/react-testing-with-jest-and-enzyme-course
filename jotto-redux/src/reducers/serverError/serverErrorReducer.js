import {actionTypes} from "../../actions";

const serverErrorReducer = (state = false, action) => {
    switch (action.type) {
        case actionTypes.SERVER_ERROR:
            return true;
        default:
            return state;
    }
}

export default serverErrorReducer;