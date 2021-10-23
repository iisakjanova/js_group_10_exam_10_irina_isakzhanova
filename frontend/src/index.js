import React from 'react';
import ReactDOM from 'react-dom';
import {CssBaseline} from "@material-ui/core";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";

import App from './App';
import postsReducer from "./store/reducers/postsReducer";
import commentsReducer from "./store/reducers/commentsReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    posts: postsReducer,
    comments: commentsReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <CssBaseline />
            <App />
        </Provider>
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));