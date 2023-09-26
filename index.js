const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators; 

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

//init state
const initState = {
    numOfCakes: 10,
}

//create reducer
const reducer = (state = initState, action) => {
    switch (action.type) {
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

//create store
const store = createStore(reducer);

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

//subscribe & unsubscribe to the store
const unsubscribe = store.subscribe(()=> console.log("Update state", store.getState()))

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const actions = bindActionCreators({orderCake, restockCake}, store.dispatch);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);


unsubscribe();