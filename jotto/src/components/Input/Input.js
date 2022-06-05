import React from 'react';
import PropTypes from 'prop-types';


const Input = ({success, secretWord}) => {
    const [currentGuess, setCurrentGuess] = React.useState('');

    const handleClick = (e) => {
        e.preventDefault();
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
                    className="mb-2 mx-sm-3"
                    type="text"
                    placeholder="enter guess"
                    value={currentGuess}
                    onChange={(e) => setCurrentGuess(e.target.value)}
                />
                <button
                    data-test="submit-button"
                    className="btn btn-primary mb-2"
                    onClick={handleClick}>
                    Submit
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
