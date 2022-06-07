import {getLetterMatchCount} from "./index";

describe('getLetterMatchCount', () => {
    const secretWord = 'party';

    test('returns correct count when there are no matching letters', () => {
        const letterMatchCount = getLetterMatchCount('bones', secretWord);
        expect(letterMatchCount).toBe(0);
    });

    test('returns correct count when there are three matching letters', () => {
        const letterMatchCount = getLetterMatchCount('train', secretWord);
        expect(letterMatchCount).toBe(3);
    });

    test('returns correct count when there duplicate letters in the guess', () => {
        const letterMatchCount = getLetterMatchCount('parka', secretWord);
        expect(letterMatchCount).toBe(3);
    });
});