import {combineReducers} from "redux";
import successReducer from "./success/successReducer";
import guessedWordsReducer from "./guessedWords/guessedWordsReducer";
import secretWordReducer from "./secretWord/secretWordReducer";

export default combineReducers({
    success: successReducer,
    guessedWords: guessedWordsReducer,
    secretWord: secretWordReducer
});