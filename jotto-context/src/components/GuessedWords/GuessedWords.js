import React from "react";
import languageContext from "../../contexts/language/languageContext";
import stringsModule from "../../helpers/strings";
import guessedWordsContext from "../../contexts/guessedWords/guessedWordsContext";


const GuessedWords = () => {
    const language = React.useContext(languageContext);
    const [guessedWords] = guessedWordsContext.useGuessedWords();

    let contents;
    if (guessedWords.length === 0) {
        contents = (
            <span data-test="guess-instructions">
                {stringsModule.getStringByLanguage(language, 'guessPrompt')}
            </span>
        )
    } else {
        const guessedWordsNodes = guessedWords.map((word, index) => (
            <tr data-test="guessed-word" key={index}>
                <td>{word.guessedWord}</td>
                <td>{word.letterMatchCount}</td>
            </tr>
        ));
        contents = (
            <div data-test="guessed-words">
                <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
                <table className="table table-sm">
                    <thead className="table-secondary">
                    <tr>
                        <th>{stringsModule.getStringByLanguage(language, 'guessColumnHeader')}</th>
                        <th>{stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {guessedWordsNodes}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div data-test="component-guessed-words">
            {contents}
        </div>
    );
}

GuessedWords.propTypes = {};

GuessedWords.defaultProps = {};

export default GuessedWords;
