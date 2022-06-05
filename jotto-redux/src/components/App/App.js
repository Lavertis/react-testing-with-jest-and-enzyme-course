import './App.css';
import Congrats from "../Congrats/Congrats";
import GuessedWords from "../GuessedWords/GuessedWords";
import Input from "../Input/Input";
import {useEffect} from "react";
import {getSecretWord} from "../../actions";
import {useSelector} from "react-redux";

function App() {
    const success = useSelector(state => state.success);
    const guessedWords = useSelector(state => state.guessedWords);

    const secretWord = 'party';

    useEffect(() => {
        getSecretWord();
    }, []);

    return (
        <div className="container" data-test="component-app">
            <h1>Jotto</h1>
            <Congrats success={success}/>
            <Input success={success} secretWord={secretWord}/>
            <GuessedWords guessedWords={guessedWords}/>
        </div>
    );
}

export default App;
