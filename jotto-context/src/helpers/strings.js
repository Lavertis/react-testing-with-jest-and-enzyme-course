const languageStrings = {
    en: {
        congrats: 'Congratulations! You guessed the word!',
        submit: 'Submit',
        guessPrompt: 'Try to guess the secret word!',
        guessInputPlaceholder: 'enter guess',
        guessedWords: 'Guesses',
        guessColumnHeader: 'Guessed Words',
        matchingLettersColumnHeader: 'Matching Letters',
    },
    emoji: {
        congrats: '🎯🎉',
        submit: '🚀',
        guessPrompt: '🤔🤫🔤',
        guessInputPlaceholder: '⌨️🤔',
        guessedWords: '🤷‍🔤',
        guessColumnHeader: '🤷‍',
        matchingLettersColumnHeader: '✅',
    }
}

const getStringByLanguage = (languageCode, stringKey, strings = languageStrings) => {
    if (!strings[languageCode] || !strings[languageCode][stringKey]) {
        console.warn(`Could not get string [${stringKey}] for [${languageCode}]`);
        return strings.en[stringKey];
    }
    return strings[languageCode][stringKey];
}

export default {getStringByLanguage}