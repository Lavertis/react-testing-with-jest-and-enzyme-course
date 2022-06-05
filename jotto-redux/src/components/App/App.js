import './App.css';
import Congrats from "../Congrats/Congrats";
import GuessedWords from "../GuessedWords/GuessedWords";
import Input from "../Input/Input";
import {useEffect} from "react";
import {getSecretWord} from "../../actions";

function App() {
    // TODO: get props from shared state
    const {success, guessedWords, secretWord} = {
        success: false,
        guessedWords: [{guessedWord: 'train', letterMatchCount: 3}],
        secretWord: 'train'
    }

    useEffect(() => {
        getSecretWord();
    }, []);

    return (
        <div className="container" data-test="component-app">
            <h1>Jotto</h1>
            <Congrats success={true}/>
            <Input success={success} secretWord={secretWord}/>
            <GuessedWords guessedWords={guessedWords}/>
        </div>
    );
}

export default App;
