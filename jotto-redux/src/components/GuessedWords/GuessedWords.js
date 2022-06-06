import PropTypes from "prop-types";


const GuessedWords = (props) => {
    let contents;
    if (props.guessedWords.length === 0) {
        contents = (
            <span data-test="guess-instructions">
                Try to guess the secret word!
            </span>
        )
    } else {
        const guessedWordsNodes = props.guessedWords.map((word, index) => (
            <tr data-test="guessed-word" key={index}>
                <td data-test="guessed-word-index">{index + 1}</td>
                <td>{word.guessedWord}</td>
                <td>{word.letterMatchCount}</td>
            </tr>
        ));
        contents = (
            <div data-test="guessed-words">
                <h3>Guessed Words</h3>
                <table className="table table-sm">
                    <thead className="table-secondary">
                    <tr>
                        <th>#</th>
                        <th>Guess</th>
                        <th>Matching Letters</th>
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
