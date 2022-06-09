import React from "react";
import PropTypes from "prop-types";
import languageContext from "../../contexts/language/languageContext";
import stringsModule from "../../helpers/strings";


const GuessedWords = (props) => {
    const language = React.useContext(languageContext);

    let contents;
    if (props.guessedWords.length === 0) {
        contents = (
            <span data-test="guess-instructions">
                {stringsModule.getStringByLanguage(language, 'guessPrompt')}
            </span>
        )
    } else {
        const guessedWordsNodes = props.guessedWords.map((word, index) => (
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

GuessedWords.propTypes = {
    guessedWords: PropTypes.arrayOf(
        PropTypes.shape({
            guessedWord: PropTypes.string.isRequired,
            letterMatchCount: PropTypes.number.isRequired
        })
    ).isRequired
};

GuessedWords.defaultProps = {};

export default GuessedWords;
