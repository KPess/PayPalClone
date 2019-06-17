//initial state
const initialState = {
    username: '',
    balance: null,
    loginFirst: false
}

//constants
const SET_USERNAME = "SET_USERNAME";
const SET_BALANCE = "SET_BALANCE";
const SET_LOGIN_FIRST = 'SET_LOGIN_FIRST'

//action creators
export function setLoginFirst() {
    return {
        type: SET_LOGIN_FIRST,
        payload: true
    }
}
export function setUsername(username) {
    return {
        type: SET_USERNAME,
        payload: username
    }
}

export function setBalance(balance) {
    return {
        type: SET_BALANCE,
        payload: balance
    }
}

//reducer
export default function reducer(state=initialState, action) {
    switch(action.type) {
        case SET_LOGIN_FIRST:
            return {
                ...state,
                loginFirst: true
            }
        case SET_USERNAME:
            console.log({
                ...state,
                username: action.payload
            })
            return {
                ...state,
                username: action.payload
            }
        case SET_BALANCE:
            console.log({
                ...state,
                balance: action.payload
            })
            return {
                ...state,
                balance: action.payload
            }
        default: return state;
    }
}