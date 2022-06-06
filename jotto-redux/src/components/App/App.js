import './App.css';
import Congrats from "../Congrats/Congrats";
import GuessedWords from "../GuessedWords/GuessedWords";
import Input from "../Input/Input";
import {useEffect} from "react";
import {getSecretWord, resetGame} from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import TotalGuesses from "../TotalGuesses/TotalGuesses";
import NewWordButton from "../NewWordButton/NewWordButton";
import SecretWordReveal from "../SecretWordReveal/SecretWordReveal";

function App() {
    const dispatch = useDispatch();
    const success = useSelector(state => state.success);
    const guessedWords = useSelector(state => state.guessedWords);
    const secretWord = useSelector(state => state.secretWord);
    const gaveUp = useSelector(state => state.gaveUp);

    useEffect(() => {
        dispatch(getSecretWord());
    }, [dispatch]);

    return (
        <div className="container" data-test="component-app">
            <h1>Jotto</h1>
            <div>The secret word is: {secretWord}</div>
            <Congrats success={success}/>
            <SecretWordReveal display={gaveUp} secretWord={secretWord}/>
            <NewWordButton display={success || gaveUp} resetAction={() => dispatch(resetGame())}/>
            <Input success={success} secretWord={secretWord} guessCount={guessedWords.length}/>
            <GuessedWords guessedWords={guessedWords}/>
            <TotalGuesses guessCount={guessedWords.length}/>
        </div>
    );
}

export default App;
