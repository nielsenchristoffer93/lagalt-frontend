import reportWebVitals from './reportWebVitals';
import React from 'react';
import store from './redux/Store';
import KeycloakService from "./services/keycloak";
import { Provider } from 'react-redux';
import App from './App';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const renderApp = () => {ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
    );
}

KeycloakService.initKeycloak(renderApp)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
