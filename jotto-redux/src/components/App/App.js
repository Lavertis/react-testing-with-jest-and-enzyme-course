import './App.css';
import Congrats from "../Congrats/Congrats";
import GuessedWords from "../GuessedWords/GuessedWords";
import Input from "../Input/Input";
import {useEffect} from "react";
import {getSecretWord, resetGame, setUserEntering, setUserSecretWord} from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import TotalGuesses from "../TotalGuesses/TotalGuesses";
import NewWordButton from "../NewWordButton/NewWordButton";
import SecretWordReveal from "../SecretWordReveal/SecretWordReveal";
import EnterWordForm from "../EnterWordForm/EnterWordForm";
import EnterWordButton from "../EnterWordButton/EnterWordButton";
import ServerError from "../ServerError/ServerError";

function App() {
    const dispatch = useDispatch();
    const success = useSelector(state => state.success);
    const guessedWords = useSelector(state => state.guessedWords);
    const secretWord = useSelector(state => state.secretWord);
    const gaveUp = useSelector(state => state.gaveUp);
    const userEnter = useSelector(state => state.userEnter);
    const serverError = useSelector(state => state.serverError);

    let contents;

    useEffect(() => {
        dispatch(getSecretWord());
    }, [dispatch]);

    if (serverError) {
        contents = <ServerError/>
    } else if (userEnter === "inProgress") {
        contents = <EnterWordForm formAction={(word) => dispatch(setUserSecretWord(word))}/>
    } else {
        contents = (
            <>
                <div>The secret word is: {secretWord}</div>
                <Congrats success={success}/>
                <SecretWordReveal display={gaveUp} secretWord={secretWord}/>
                <NewWordButton display={success || gaveUp} resetAction={() => dispatch(resetGame())}/>
                <Input success={success} secretWord={secretWord} guessCount={guessedWords.length}/>
                <GuessedWords guessedWords={guessedWords}/>
                <TotalGuesses guessCount={guessedWords.length}/>
                <EnterWordButton display={guessedWords.length === 0} buttonAction={() => dispatch(setUserEntering())}/>
            </>
        )
    }

    return (
        <div className="container" data-test="component-app">
            <h1>Jotto</h1>
            {contents}
        </div>
    );
}

export default App;
