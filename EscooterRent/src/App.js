import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import RentPoints from './pages/RentPoints';
import { CssBaseline, GlobalStyles} from '@mui/material';
import React, { useState } from 'react';
import { Container } from '@mui/system';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  useState(() => {
    const locations = ["/", "/login", "/register"];
    if (!sessionStorage.getItem("accessToken") && !locations.includes(window.location.pathname)){
      window.location.href = "/login";
    }
  }, []);

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />

      <Router>
        <NavBar />
        <Container maxWidth="100vw" sx={{padding: "20px"}}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/rent-points">
              <RentPoints />
            </Route>
            <Route path="/">
              <NotFound />
            </Route>
          </Switch>
        </Container>
      </Router>

    </React.Fragment>
  );
}

export default App;
