//initial state
const initialState = {
    username: '',
    balance: null,
    loginFirst: false,
    loggedIn: false,
    isadmin: null,
    userid: '',
    user: [],
    transactions: [],
    rcvdTransactions: [],
    sentTransactions: [],
}

//constants
const SET_USERNAME = "SET_USERNAME";
const SET_BALANCE = "SET_BALANCE";
const SET_USER = "SET_USER"
const GET_TRANSACTIONS = "GET_TRANSACTIONS"
const GET_SENT_TRANSACTIONS = "GET_SENT_TRANSACTIONS"
const GET_RCVD_TRANSACTIONS = "GET_RCVD_TRANSACTIONS"
const SET_INITIALSTATE = "SET_INITIALSTATE"

//action creators
export function resetReduxState() {
    return {
        type: SET_INITIALSTATE,
        payload: initialState

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
export function getTransactions(transactions) {
    return {
        type: GET_TRANSACTIONS,
        payload: transactions
    }
}
export function getSentTransactions(sentTransactions) {
    return {
        type: GET_SENT_TRANSACTIONS,
        payload: sentTransactions
    }
}
export function getRcvdTransactions(rcvdTransactions) {
    return {
        type: GET_RCVD_TRANSACTIONS,
        payload: rcvdTransactions
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
                loggedIn: false,
                isAdmin: null,
                userid: '',
                user: [],
                transactions: [],
                rcvdTransactions: [],
                sentTransactions: [],
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
        case GET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload
            }
        case GET_SENT_TRANSACTIONS:
            return {
                ...state,
                sentTransactions: action.payload
            }
        case GET_RCVD_TRANSACTIONS:
            return {
                ...state,
                rcvdTransactions: action.payload
            }
        default: return state;
    }
}