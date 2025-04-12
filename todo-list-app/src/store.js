import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { controlPanelReducer, editingReducer, todosReducer } from './reducers';

const reducer = combineReducers({
	todos: todosReducer,
	controlPanel: controlPanelReducer,
	editing: editingReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
