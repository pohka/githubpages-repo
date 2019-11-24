import React from 'react';
import './App.css';
import "./components/Category"
import APINavbar from './components/Navbar';
import API from "./components/API";
import Router from "./Router"
import MainNav from "./components/MainNav.js"
import KVPage from "./components/KVPage"
import ScrollTo from "./components/Scroll.js"
import Home from "./components/Home.js"
import DotaHome from "./components/DotaHome.js"
import DotaMarkdown from './components/DotaMarkdown';
import DotaVideoCon from './components/DotaVideoCon';


function addRoutes()
{
  Router.init();

  Router.addRoute({
    name: "dota-home",
    path: "/dota/",
    dom: function () {
      return (
        <div>
          <MainNav></MainNav>
          <DotaHome></DotaHome>
        </div>
      );
    },
    meta : {
      title : "Home - DCG Tools"
    }
  });

  Router.addRoute({
    name: "dota-api",
    path: "/dota/api",
    dom : function () {
      return (
        <div>
          <MainNav></MainNav>
          <API></API>
          <APINavbar menu="all"></APINavbar>
        </div>
      );
    },
    meta : {
      title : "API - DCG Tools"
    }
  });

  Router.addRoute({
    name: "dota-videos",
    path: "/dota/videos",
    dom : function () {
      return (
        <div>
          <MainNav></MainNav>
          <DotaVideoCon></DotaVideoCon>
        </div>
      );
    },
    meta : {
      title : "Videos - DCG Tools"
    }
  });

  Router.addRoute({
    name: "dota-libs",
    path: "/dota/libs",
    dom : function () {
      return (
        <div>
          <MainNav></MainNav>
          <DotaMarkdown></DotaMarkdown>
        </div>
      );
    },
    meta : {
      title : function(){
        let hash = window.location.hash.substr(1);
        let words = hash.split("-");
        //to title case
        for(let i=0; i<words.length; i++)
        {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        let title = words.join(" ") + " - DCG Tools";
        return title;
      }
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

  var curRoute = Router.findRouteMatch(window.location.pathname)
  Router.setRouteMetaData(curRoute);

  return (
    <div className="App">
      {Router.getCurrentRouteDom()}
    </div>
  );
}

export default App;
