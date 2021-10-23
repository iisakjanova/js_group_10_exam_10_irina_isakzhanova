import React from 'react';
import ReactDOM from 'react-dom';
import {CssBaseline} from "@material-ui/core";
import {BrowserRouter} from "react-router-dom";

import App from './App';

const app = (
    <BrowserRouter>
        <CssBaseline />
        <App />
    </BrowserRouter>
);


ReactDOM.render(app, document.getElementById('root'));
