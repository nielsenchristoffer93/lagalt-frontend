import reportWebVitals from './reportWebVitals';
import React from 'react';
import store from './redux/store';
import KeycloakService from "./services/keycloakService";
import { Provider } from 'react-redux';
import App from './App';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const renderApp = () => {ReactDOM.render(
    /*<React.StrictMode>*/
    <Provider store={store}>
        <App />
    </Provider>,
    /*React.StrictMode>,*/
    document.getElementById('root')
    );
}

KeycloakService.initKeycloak(renderApp)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
