import React from 'react';
import PropTypes from "prop-types";
import languageContext from "../../contexts/language/languageContext";
import stringsModule from '../../helpers/strings'


const Congrats = ({success}) => {
    const language = React.useContext(languageContext);

    if (success) {
        return (
            <div data-test='component-congrats' className="alert alert-success">
                <span data-test='congrats-message'>
                    {stringsModule.getStringByLanguage(language, 'congrats')}
                </span>
            </div>
        );
    }
    return <div data-test='component-congrats'/>;
}

Congrats.propTypes = {
    success: PropTypes.bool.isRequired
};

Congrats.defaultProps = {};

export default Congrats;
