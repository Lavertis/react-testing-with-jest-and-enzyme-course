import React from 'react';


const Congrats = ({success}) => {
    if (success) {
        return (
            <div data-test='component-congrats'>
                <span data-test='congrats-message'>Congrats! You guessed the word!</span>
            </div>
        );
    }
    return (<div data-test='component-congrats'/>);
}

Congrats.propTypes = {};

Congrats.defaultProps = {};

export default Congrats;
