import React from 'react';
import logo from './logo.svg';
import './App.css';
import "./components/Category"
import APINavbar from './components/Navbar';
import API from "./components/API";
import Router from "./Router"
import MainNav from "./components/MainNav.js"
import KVPage from "./components/KVPage"


function addRoutes()
{
  Router.addRoute({
    name: "api",
    path: "/api",
    dom : function () {
      return (
        <div>
          <MainNav></MainNav>
          <API></API>
          <APINavbar></APINavbar>
        </div>
      );
    }
  });

  Router.addRoute({
    name: "kv-checker",
    path: "/kv-checker",
    dom: function () {
      return (
        <div>
          <MainNav></MainNav>
          <KVPage></KVPage>
        </div>
      );
    }
  });
}

function App() {
  addRoutes();


  return (
    <div className="App">
      {Router.getCurrentRouteDom()}
    </div>
  );
}

export default App;
