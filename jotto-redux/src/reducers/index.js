import {combineReducers} from "redux";
import successReducer from "./success/successReducer";
import guessedWordsReducer from "./guessedWords/guessedWordsReducer";
import secretWordReducer from "./secretWord/secretWordReducer";
import gaveUpReducer from "./gaveUp/gaveUpReducer";

export default combineReducers({
    success: successReducer,
    guessedWords: guessedWordsReducer,
    secretWord: secretWordReducer,
    gaveUp: gaveUpReducer
});