import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import thunk from "redux-thunk";
import axios from 'axios';




//action name const 
const ini = 'init'
const inc = 'increment';
const dec = 'decrement';
const incByAmount = 'incrementByAmount'

const store = createStore(reducer, applyMiddleware(logger.default, thunk.default));

const history = [];



function reducer(state = { amount: 1 }, action) {
    switch (action.type) {
        case ini:
            return { amount: action.payload }
        case inc:
            return { amount: state.amount + 1 }
        case dec:
            return { amount: state.amount - 1 }
        case incByAmount:
            return { amount: state.amount + action.payload }
        default:
            return state;
    }

}

// global state

// store.subscribe(() => {
//     history.push(store.getState())
//     console.log(history)
// })


//Action creator
async function getUser(dispatch, getState) {
    const { data } = await axios.get('');
    dispatch(initUser(data.amount));
}

function initUser(value) {
    return { type: ini, payload: value }
}
function increment() {
    return { type: inc }
}
function decrement() {
    return { type: dec }
} function incrementByAmount(value) {
    return { type: incByAmount, payload: value }
}

setInterval(() => {
    store.dispatch(initUser(500))
}, 2000)


//Async Api call