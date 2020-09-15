import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, compose, Store } from "redux";
import { Provider } from "react-redux";
import { userReducer } from "./store/users/reducers";
import "./assets/scss/app.scss";
import App from "./App";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store<UserState, UserAction> & {
  dispatch: DispatchType;
} = createStore(userReducer, composeEnhancers());

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
