import React from 'react';


const ServerError = () => {
    return (
        <div data-test="component-server-error" className="alert alert-danger">
            There was an error retrieving the secret word. Please try again later.
        </div>
    );
}

ServerError.propTypes = {};

ServerError.defaultProps = {};

export default ServerError;
