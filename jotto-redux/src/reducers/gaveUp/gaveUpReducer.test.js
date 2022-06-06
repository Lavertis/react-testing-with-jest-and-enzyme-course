import gaveUpReducer from "./gaveUpReducer";
import {actionTypes} from "../../actions";

test('returns default initial state of \'false\' when no action is passed', () => {
    const newState = gaveUpReducer(undefined, {});
    expect(newState).toBeFalsy();
})

test('returns state of true upon receiving an action of type \'GIVE_UP\'', () => {
    const newState = gaveUpReducer(false, {type: actionTypes.GIVE_UP});
    expect(newState).toBeTruthy();
});

test('returns state of false upon receiving an action of type \'RESET_GAME\'', () => {
    // start with giveUp true, since giveUp is false by default
    const newState = gaveUpReducer(true, {type: actionTypes.RESET_GAME});
    expect(newState).toBeFalsy();
});
