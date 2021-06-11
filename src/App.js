import React,{useState} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.css'
import { Cards } from './components/Cards/Cards'
import { Home } from './components/Home/Home'
import Login from './components/Login/Login'
import { Stats } from './components/Stats/Stats'
import Suggestions from './components/Suggestions/Suggestions'
import GetStats from './components/GetStats/GetStats'

function App() {
  // const[ids,setIds]=useState([])
  // console.log('App',ids)
  return (
    <div className="App">
      <Router>
      <Route exact path="/">
      <Login />
      </Route>
      <Route path="/home">
        <Home/>
      </Route>
      <Route path="/stats">
        <Stats />
      
      </Route>
      <Route path="/suggestions">
        <Suggestions />
      </Route>
      <Route path="/getStats">
        <GetStats />
      </Route>
      </Router>
    </div>
  );
}

export default App;
