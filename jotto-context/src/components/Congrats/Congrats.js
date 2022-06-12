import React from 'react';
import languageContext from "../../contexts/language/languageContext";
import successContext from "../../contexts/success/successContext";
import stringsModule from '../../helpers/strings'


const Congrats = () => {
    const language = React.useContext(languageContext);
    const [success] = successContext.useSuccess();

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

Congrats.propTypes = {};

Congrats.defaultProps = {};

export default Congrats;
