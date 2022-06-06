import React from 'react';


const GuessCount = (props) => {
    if (props.guessCount > 0) {
        return (
            <div data-test="component-guess-count">
                Total guesses:&nbsp;
                <span data-test="guess-count">{props.guessCount}</span>
            </div>
        );
    }
    return <div data-test="component-guess-count"/>
}

GuessCount.propTypes = {};

GuessCount.defaultProps = {};

export default GuessCount;
