// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Header from './components/Header'
import 'semantic-ui-css/semantic.min.css'
// import pkg from 'semantic-ui-react/package.json'
import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import MyLocation from './components/MyLocation';
import Nav from './components/Nav'

function App() {
  
  return (
    <div className="App">
      {/* <br/><br/><br/><br/> */}
      <Router>
        <Header/>
        <Nav/>
        <Switch>
          <Route path="/" exact component={MyLocation}></Route>
          <Route path="/search" exact component={Home}></Route>
          <Redirect path="*" to="/"/>
        </Switch>
      </Router>
      {/* <br/><br/><br/><br/> */}
    </div>
  );
}

export default App;