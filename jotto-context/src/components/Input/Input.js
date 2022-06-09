import React from 'react';
import PropTypes from 'prop-types';
import stringsModule from '../../helpers/strings'
import languageContext from "../../contexts/language/languageContext";

const Input = ({success, secretWord}) => {
    const language = React.useContext(languageContext);
    const [currentGuess, setCurrentGuess] = React.useState('');

    const handleSubmit = (e) => {
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
                    className="mb-2"
                    type="text"
                    placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
                    value={currentGuess}
                    onChange={(e) => setCurrentGuess(e.target.value)}
                />
                <button
                    data-test="submit-button"
                    className="btn btn-primary mb-2"
                    onClick={handleSubmit}>
                    {stringsModule.getStringByLanguage(language, 'submit')}
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
