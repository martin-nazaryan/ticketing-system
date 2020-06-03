import React from "react";
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import cookies from 'js-cookie';

import {ACCESS_TOKEN} from "./constants";
import Tickets from './components/layout/Tickets';
import store from './store';
import Login from "./components/layout/Login";

import './App.scss';

const ProtectedRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    cookies.get(ACCESS_TOKEN) ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: {from: props.location}
      }}/>
    )
  )}/>
);

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <ProtectedRoute exact path="/" component={Tickets}/>
        <Redirect to="/"/>
      </Switch>
    </Router>
  </Provider>
)

export default App;
