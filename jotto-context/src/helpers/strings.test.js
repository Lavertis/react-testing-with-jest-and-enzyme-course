import stringsModule from './strings';

const {getStringByLanguage} = stringsModule;

const strings = {
    en: {submit: 'submit'},
    emoji: {submit: '🚀'},
    mermish: {}
}

describe('language string testing', () => {
    const consoleWarnMock = jest.fn();
    let originalConsoleWarn = console.warn;

    beforeEach(() => {
        console.warn = consoleWarnMock;
    })
    afterEach(() => {
        console.warn = originalConsoleWarn;
    })

    test('returns correct submit string for English', () => {
        const string = getStringByLanguage('en', 'submit', strings);
        expect(string).toBe('submit')
        expect(consoleWarnMock).not.toHaveBeenCalled();
    })

    test('returns correct submit string for Emoji', () => {
        const string = getStringByLanguage('emoji', 'submit', strings);
        expect(string).toBe('🚀');
        expect(consoleWarnMock).not.toHaveBeenCalled();
    })

    test('returns english submit string when language does not exist', () => {
        const string = getStringByLanguage('notALanguage', 'submit', strings);
        expect(string).toBe('submit');
        expect(consoleWarnMock).toHaveBeenCalledWith(`Could not get string [submit] for [notALanguage]`);
    })

    test('returns english submit string when submit key does not exist for language', () => {
        const string = getStringByLanguage('mermish', 'submit', strings);
        expect(string).toBe('submit');
        expect(consoleWarnMock).toHaveBeenCalledWith(`Could not get string [submit] for [mermish]`);
    })
})