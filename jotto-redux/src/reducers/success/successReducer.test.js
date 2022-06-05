import successReducer from "./successReducer";
import {actionTypes} from "../../actions";

test('when previous state is undefined return false', () => {
    const newState = successReducer(undefined, {});
    expect(newState).toBe(false);
});

test('return previous state if action is not handled', () => {
    const newState = successReducer(false, 'unknown');
    expect(newState).toBe(false);
});

test('return true if action is CORRECT_GUESS', () => {
    const newState = successReducer(false, {type: actionTypes.CORRECT_GUESS});
    expect(newState).toBeTruthy();
});