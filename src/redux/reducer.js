//initial state
const initialState = {
    username: '',
    balance: null,
    loginFirst: false,
    loggedIn: false,
    isAdmin: false,
    userid: ''
}

//constants
const SET_USERNAME = "SET_USERNAME";
const SET_BALANCE = "SET_BALANCE";
const SET_LOGIN_FIRST = "SET_LOGIN_FIRST"
const SET_ADMIN = "SET_ADMIN"
const SET_INITIALSTATE = "SET_INITIALSTATE"

//action creators
export function resetReduxState() {
    return {
        type: SET_INITIALSTATE,
        payload: initialState

    }
}
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
export function setAdmin() {
    return {
        type: SET_ADMIN,
        payload: true
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
        case SET_INITIALSTATE:
            return {
                username: '',
                balance: null,
                loginFirst: false,
                loggedIn: false,
                isAdmin: false,
                userid: ''
            }
        case SET_LOGIN_FIRST:
            return {
                ...state,
                loginFirst: true
            }
        case SET_USERNAME:
            // {
            //     ...state,
            //     username: action.payload
            // }
            return {
                ...state,
                username: action.payload
            }
        case SET_BALANCE:
            // {
            //     ...state,
            //     balance: action.payload
            // }
            return {
                ...state,
                balance: action.payload
            }
        case SET_ADMIN:
            return {
                ...state,
                isAdmin: true
            }
        default: return state;
    }
}