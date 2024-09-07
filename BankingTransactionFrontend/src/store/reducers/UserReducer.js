import {
    GET_USERNAME
} from "../actions/UserAction";

import {
    authUsername
} from "../initialValues/UserInitialValue";

const initialState = {
    authUsername: authUsername
};

export default function AccountReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_USERNAME:
            return {
                ...state,
                authUsername: payload,
            };
        default:
            return state;
    }
}