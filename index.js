const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators; 
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

//init state
const initCakeState = {
    numOfCakes: 10,
}

const initIceCreamState = {
    numOfIceCreams: 20,
}

//define action creator 
function orderCake(){
    return {
        type: CAKE_ORDERED,
        payload: 1,
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

function orderIceCream(qty = 1){
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    }
}

function restockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    }
}


//create reducer
const cakeReducer = (state = initCakeState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default: 
        return state
    } 
}

const iceCreamReducer = (state = initIceCreamState, action) => {
    switch(action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default: 
        return state
    }
}

//combine reducers
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

//create store
const store = createStore(rootReducer);


//subscribe & unsubscribe to the store
const unsubscribe = store.subscribe(()=> console.log("Update state", store.getState()))

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const actions = bindActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);


unsubscribe();