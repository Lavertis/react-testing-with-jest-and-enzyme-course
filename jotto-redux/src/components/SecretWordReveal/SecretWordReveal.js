import React from 'react';


const SecretWordReveal = ({display, secretWord}) => {
    if (display) {
        return (
            <div data-test="component-secret-word-reveal" className="alert alert-danger">
                <span data-test="reveal-message">
                  The secret word was "{secretWord}"<br/>
                  Better luck next time!
                </span>
            </div>
        );
    }
    return <div data-test="component-secret-word-reveal"/>;
}

SecretWordReveal.propTypes = {};

SecretWordReveal.defaultProps = {};

export default SecretWordReveal;
