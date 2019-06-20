//initial state
const initialState = {
    username: '',
    balance: null,
    loginFirst: false,
    loggedIn: false,
    isadmin: null,
    userid: '',
    user: [],
    transactions: []
}

//constants
const SET_USERNAME = "SET_USERNAME";
const SET_BALANCE = "SET_BALANCE";
const SET_LOGIN_FIRST = "SET_LOGIN_FIRST"
const SET_USER = "SET_USER"
const SET_TRANSACTIONS = "SET_TRANSACTIONS"
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
export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}
export function setTransactions(transactions) {
    return {
        type: SET_USER,
        payload: transactions
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
                isAdmin: null,
                userid: '',
                user: [],
                transactions: []
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
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload
            }
        default: return state;
    }
}