import axios from "axios";

export const getSecretWord = async (setSecretWord) => {
    const response = await axios.get('http://localhost:3030/secret');
    setSecretWord(response.data);
}