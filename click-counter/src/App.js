import './App.css';
import {useState} from "react";

function App() {
    const [count, setCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const increment = () => {
        setCount(count + 1)
        setErrorMessage('');
    };

    const decrement = () => {
        if (count > 0)
            setCount(count - 1);
        else
            setErrorMessage('Cannot decrement below 0');
    }

    return (
        <div className="App" data-test="component-app">
            <h1 data-test="counter-display">
                The counter is currently&nbsp;
                <span data-test="count">{count}</span>
            </h1>
            {errorMessage && <p data-test="error-message" style={{color: 'red'}}>{errorMessage}</p>}
            <button data-test="increment-button" onClick={increment}>
                Increment counter
            </button>
            &nbsp;
            <button data-test="decrement-button" onClick={decrement}>
                Decrement counter
            </button>
        </div>
    );
}

export default App;
