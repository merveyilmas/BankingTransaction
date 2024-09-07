import {
    GET_ALL_ACCOUNTS
} from "../actions/AccountAction";

import {
    accounts
} from "../initialValues/AccountInitialValues";

const initialState = {
    accounts: accounts
};

export default function AccountReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_ACCOUNTS:
            return {
                ...state,
                accounts: payload,
            };
        default:
            return state;
    }
}