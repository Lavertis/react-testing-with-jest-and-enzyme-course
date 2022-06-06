import React from 'react';


const TotalGuesses = (props) => {
    if (props.guessCount > 0) {
        return (
            <div data-test="component-guess-count">
                <h6>
                    Total guesses:&nbsp;
                    <span data-test="guess-count">{props.guessCount}</span>
                </h6>
            </div>
        );
    }
    return <div data-test="component-guess-count"/>
}

TotalGuesses.propTypes = {};

TotalGuesses.defaultProps = {};

export default TotalGuesses;
