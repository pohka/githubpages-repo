import React from 'react';
import logo from './logo.svg';
import './App.css';
import "./components/Category"
import Navbar from './components/Navbar';

import API from "./components/API";


function App() {
  return (
    <div className="App">
      <API></API>
      <Navbar></Navbar>
    </div>
  );
}

export default App;
