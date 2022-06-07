import './App.css';
import React, {useEffect} from "react";
import Congrats from "../Congrats/Congrats";
import GuessedWords from "../GuessedWords/GuessedWords";
import Input from "../Input/Input";
import {getSecretWord} from "../../actions";

const reducer = (state, action) => {
    switch (action.type) {
        case 'setSecretWord':
            return {...state, secretWord: action.payload}
        default:
            throw new Error(`Invalid action type: ${action.type}`)
    }
}

function App() {
    const [state, dispatch] = React.useReducer(reducer, {secretWord: ''})
    const success = false;
    const guessedWords = [];

    const setSecretWord = (secretWord) => {
        dispatch({type: 'setSecretWord', payload: secretWord})
    }

    useEffect(() => {
        getSecretWord(state.secretWord);
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
            <Congrats success={true}/>
            <Input success={success} secretWord={state.secretWord}/>
            <GuessedWords guessedWords={[{guessedWord: 'train', letterMatchCount: 3}]}/>
        </div>
    );
}

export default App;
