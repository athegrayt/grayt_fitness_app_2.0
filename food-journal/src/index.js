import React from "react";

import ReactDOM from "react-dom";
// import thunk from "redux-thunk";
// import {reducer as reduxForm} from 'redux-form'
import GlobalState from './context/GlobalState'
// import { Provider } from "react-redux";
// import { createStore, applyMiddleware, compose, combineReducers } from "redux";
// import entriesReducer from "./store/reducers/journalEntries";
// import authReducer from "./store/reducers/auth";
// import userInfoReducer from "./store/reducers/userInfo";
// import tabBarReducer from './store/reducers/tabBarReducer';
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const composeEnhancers =
// 	process.env.NODE_ENV === 'development'
// 		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
// 				trace: true,
// 				traceLimit: 25,
// 		  })
// 		: null || compose;
// const rootReducer = combineReducers({
// 	tabBar: tabBarReducer,
// 	form: reduxForm,
// 	journalEntries: entriesReducer,
// 	auth: authReducer,
// 	userInfo: userInfoReducer,
// });

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

ReactDOM.render(
	  <GlobalState>
    <React.StrictMode>
      <App />
    </React.StrictMode>
	  </GlobalState>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
