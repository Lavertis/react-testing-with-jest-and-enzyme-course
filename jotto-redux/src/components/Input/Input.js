import React from 'react';
import {useSelector} from "react-redux";


const Input = () => {
    const [currentGuess, setCurrentGuess] = React.useState('');
    const success = useSelector(state => state.success);

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

Input.propTypes = {};

Input.defaultProps = {};

export default Input;
