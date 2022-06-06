import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {giveUp, guessWord} from "../../actions";


const Input = ({guessCount}) => {
    const [currentGuess, setCurrentGuess] = React.useState('');
    const success = useSelector(state => state.success);
    const gaveUp = useSelector(state => state.gaveUp);
    const dispatch = useDispatch();

    const handleTakeGuessClick = (e) => {
        e.preventDefault();
        dispatch(guessWord(currentGuess));
        setCurrentGuess('');
    }

    const handleGiveUpClick = (e) => {
        e.preventDefault();
        dispatch(giveUp());
    }

    if (success || gaveUp) {
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
                    data-test="take-guess-button"
                    className="btn btn-primary mb-2"
                    onClick={handleTakeGuessClick}>
                    Guess
                </button>
                {guessCount > 0 &&
                    <button
                        data-test="give-up-button"
                        onClick={handleGiveUpClick}
                        className="btn btn-danger ms-2 mb-2">
                        Give up
                    </button>
                }
            </form>
        </div>
    );
}

Input.propTypes = {};

Input.defaultProps = {};

export default Input;
