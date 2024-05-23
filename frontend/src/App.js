import React, { Component } from 'react';
import './App.css';
import Header from './component/Header/Header.js';

import {
  BrowserRouter as
  Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Question from './component/Add-Question/Question.js';
import StackOverFlow from './component/StackOverFlow'
import ViewQuestion from './component/ViewQuestion'
import Auth from './component/Auth'
import { useSelector } from 'react-redux'
import { selectUser } from './feature/userSlice.js'
import { useDispatch } from 'react-redux'
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './firebase.js';
import { login, logout } from './feature/userSlice.js';



function App() {


  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
      // console.log(authUser);
    });
  }, [dispatch]);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path={user ? '/' : "/auth"} component={user ? StackOverFlow : Auth} />
          {/* <PrivateRoute exact path="/" component={StackOverFlow} /> */}
          <PrivateRoute exact path="/add-question" component={Question} />
          <PrivateRoute exact path="/question" component={ViewQuestion} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
