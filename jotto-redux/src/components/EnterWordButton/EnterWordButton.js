import React from 'react';


const EnterWordButton = (props) => {
    if (props.display) {
        return (
            <button
                data-test="component-enter-word-button"
                className="btn btn-primary mt-3"
                onClick={props.buttonAction}>
                Enter your own secret word
            </button>
        );
    }
    return <div data-test="component-enter-word-button"/>;
}

EnterWordButton.propTypes = {};

EnterWordButton.defaultProps = {};

export default EnterWordButton;
