/**
 * Created by Administrator on 2016-12-23.
 */
//import {createStore} from 'redux';
let {createStore} = require('redux');

let initialState = {test:'init'}


function counter(state,action) {
    if(state==undefined)
        state = initialState;
    switch(action.type) {
        case 'INCREMENT':
            return state+1;
        case 'DECREMENT':
            return state-1;
        default:
            return state
    }
}
let store = createStore(counter);

store.subscribe(()=>
console.log(store.getState()));

store.dispatch({type:'INCREMENT'});
store.dispatch({type:'INCREMENT'});
store.dispatch({type:'DECREMENT'});
