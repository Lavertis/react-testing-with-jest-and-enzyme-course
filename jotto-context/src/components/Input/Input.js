import React from 'react';
import PropTypes from 'prop-types';
import stringsModule from '../../helpers/strings'
import languageContext from "../../contexts/language/languageContext";
import successContext from "../../contexts/success/successContext";
import guessedWordsContext from "../../contexts/guessedWords/guessedWordsContext";
import {getLetterMatchCount} from "../../helpers";

const Input = ({secretWord}) => {
    const language = React.useContext(languageContext);
    const [success, setSuccess] = successContext.useSuccess();
    const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();
    const [currentGuess, setCurrentGuess] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
        const newGuessedWords = [...guessedWords, {guessedWord: currentGuess, letterMatchCount}]
        setGuessedWords(newGuessedWords)

        if (currentGuess === secretWord)
            setSuccess(true);
        setCurrentGuess('');
    }

    if (success) {
        return (
            <div data-test="component-input"/>
        );
    }

    return (
        <div data-test="component-input">
            <form className="form-inline">
                <input
                    data-test="input-box"
                    className="mb-2"
                    type="text"
                    placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
                    value={currentGuess}
                    onChange={(e) => setCurrentGuess(e.target.value)}
                />
                <button
                    data-test="submit-button"
                    className="btn btn-primary mb-2"
                    onClick={handleSubmit}>
                    {stringsModule.getStringByLanguage(language, 'submit')}
                </button>
            </form>
        </div>
    );
}

Input.propTypes = {
    secretWord: PropTypes.string.isRequired
};

Input.defaultProps = {};

export default Input;
