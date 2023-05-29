import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";

//action name const
const ini = "init";
const inc = "increment";
const dec = "decrement";
const incByAmount = "incrementByAmount";

const store = createStore(
  combineReducers({ account: accountReducer, bonus: bonusReducer }),
  applyMiddleware(logger.default, thunk.default)
);

const history = [];

function accountReducer(state = { points: 1 }, action) {
  switch (action.type) {
    case ini:
      return { amount: action.payload };
    case inc:
      return { amount: state.amount + 1 };
    case dec:
      return { amount: state.amount - 1 };
    case incByAmount:
      return { amount: state.amount + action.payload };
    default:
      return state;
  }
}

function bonusReducer(state = { amount: 1 }, action) {
  switch (action.type) {
    case inc:
      return { points: state.points + 1 };
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
function getUser(id) {
  return async (dispatch, getState) => {
    const { data } = await axios.get("");
    dispatch(initUser(data.amount));
  };
}

function initUser(value) {
  return { type: ini, payload: value };
}
function increment() {
  return { type: inc };
}
function decrement() {
  return { type: dec };
}
function incrementByAmount(value) {
  return { type: incByAmount, payload: value };
}

setInterval(() => {
  store.dispatch(getUser(1));
}, 2000);

//Async Api call
