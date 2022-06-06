import React from 'react';


const NewWordButton = (props) => {
    if (props.display) {
        return (
            <button
                data-test="component-new-word-button"
                className="btn btn-primary mb-2"
                onClick={props.resetAction}>
                New Word
            </button>
        );
    }
    return <div data-test="component-new-word-button"/>
}

NewWordButton.propTypes = {};

NewWordButton.defaultProps = {};

export default NewWordButton;
