import React from 'react';
import PropTypes from "prop-types";


const Congrats = ({success}) => {
    if (success) {
        return (
            <div data-test='component-congrats' className="alert alert-success">
                <span data-test='congrats-message'>Congratulations! You guessed the word!</span>
            </div>
        );
    }
    return (<div data-test='component-congrats'/>);
}

Congrats.propTypes = {
    success: PropTypes.bool.isRequired
};

Congrats.defaultProps = {};

export default Congrats;
