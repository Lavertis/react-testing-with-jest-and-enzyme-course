import './App.css';
import React, {useEffect} from "react";
import Congrats from "../Congrats/Congrats";
import GuessedWords from "../GuessedWords/GuessedWords";
import Input from "../Input/Input";
import {getSecretWord} from "../../actions";
import languageContext from "../../contexts/language/languageContext";
import successContext from "../../contexts/success/successContext";
import guessedWordsContext from "../../contexts/guessedWords/guessedWordsContext";
import LanguagePicker from "../LanguagePicker/LanguagePicker";


const reducer = (state, action) => {
    switch (action.type) {
        case 'setSecretWord':
            return {...state, secretWord: action.payload}
        case 'setLanguage':
            return {...state, language: action.payload}
        default:
            throw new Error(`Invalid action type: ${action.type}`)
    }
}

function App() {
    const [state, dispatch] = React.useReducer(reducer, {secretWord: null, language: 'en'})

    const setSecretWord = (secretWord) => {
        dispatch({type: 'setSecretWord', payload: secretWord})
    }

    const setLanguage = (language) => {
        dispatch({type: 'setLanguage', payload: language})
    }

    useEffect(() => {
        getSecretWord(setSecretWord);
    }, []);

    if (state.secretWord === null) {
        return (
            <div className="container" data-test="spinner">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p>Loading secret word...</p>
            </div>
        )
    }

    return (
        <div className="container" data-test="component-app">
            <h1>Jotto</h1>
            <p>The secret word is {state.secretWord}</p>
            <languageContext.Provider value={state.language}>
                <LanguagePicker setLanguage={setLanguage}/>
                <guessedWordsContext.GuessedWordsProvider>
                    <successContext.SuccessProvider>
                        <Congrats/>
                        <Input secretWord={state.secretWord}/>
                    </successContext.SuccessProvider>
                    <GuessedWords/>
                </guessedWordsContext.GuessedWordsProvider>
            </languageContext.Provider>
        </div>
    );
}

export default App;
