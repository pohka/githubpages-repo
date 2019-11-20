import React from 'react';
import logo from './logo.svg';
import './App.css';
import "./components/Category"
import APINavbar from './components/Navbar';
import API from "./components/API";
import Router from "./Router"
import MainNav from "./components/MainNav.js"
import KVPage from "./components/KVPage"
import ScrollTo from "./components/Scroll.js"
import Home from "./components/Home.js"


function addRoutes()
{
  Router.init();
  Router.addRoute({
    name: "dota-api",
    path: "/dota/api",
    dom : function () {
      return (
        <div>
          <MainNav></MainNav>
          <API></API>
          <APINavbar></APINavbar>
        </div>
      );
    },
    meta : {
      title : "API - DCG Tools"
    }
  });

  Router.addRoute({
    name: "dota-kv-checker",
    path: "/dota/kv-checker",
    dom: function () {
      return (
        <div>
          <MainNav></MainNav>
          <KVPage></KVPage>
        </div>
      );
    },
    meta : {
      title : "KV Checker - DCG Tools"
    }
  });

  Router.addRoute({
    name: "home",
    path: "/",
    dom: function () {
      return (
        <Home></Home>
      );
    },
    meta : {
      title : "Home - DCG Tools"
    }
  });
}

document.fonts.onloadingdone = function (fontFaceSetEvent) {
  if(window.location.hash.length > 1)
  {
    console.log("scrolling on font load")
    let id = window.location.hash.substr(1);
    ScrollTo(id);
  }
};

function App() {
  addRoutes();


  return (
    <div className="App">
      {Router.getCurrentRouteDom()}
    </div>
  );
}

export default App;
