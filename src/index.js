import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
const supportsHistory = 'pushState' in window.history

ReactDOM.render(
    <BrowserRouter forceRefresh={!supportsHistory}>
        <div className="container">
            <Switch>
                <Route path="/Login" exact component={Login} />
                <Route path="/index" component={App} />
                <Redirect to="/Login" />
            </Switch>
        </div>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
