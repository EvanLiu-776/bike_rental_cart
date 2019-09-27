import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Cartpage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import NoMatch from './components/NoMatch';
import Confirmation from './components/Confirmation';
import * as serviceWorker from './serviceWorker';
import reducer from "./reducer/reducer"
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

ReactDOM.render(
    <Provider store={createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Cartpage} />
                <Route exact path="/checkout" component={CheckoutPage} />
                <Route exact path="/confirm" component={Confirmation} />
                <Route component={NoMatch} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
