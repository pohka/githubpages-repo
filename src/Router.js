import React, { Component } from 'react';
//import App from './App';
import ReactDOM from 'react-dom';


class Router extends Component
{
  static init()
  {
    window.addEventListener("popstate", function(e) {
      let route = Router.findRouteMatch(e.target.location.pathname);
      let hash = window.location.hash.substr(1)
      Router.setRoute(route, hash, true);
    });
  }
  
  static addRoute(routeData)
  {
    Router._routes.push(routeData);
  }

  static getRouteByName(name)
  {
    for(var i=0; i<Router._routes.length; i++)
    {
      if(Router._routes[i].name === name)
      {
        return Router._routes[i];
      }
    }

    return null;
  }

  static findRouteMatch(path)
  {
    for (var i = 0; i < Router._routes.length; i++)
    {
      if (Router._routes[i].path === path)
      {
        return Router._routes[i];
      }
    }
    
    return null;
  }

  static getCurrentRouteDom()
  {
    var path = window.location.pathname;
    var route = Router.findRouteMatch(path)
    if (route === null) 
    {
      return (<div>Page not Found</div>);
    }

    return route.dom();
  }

  static setRouteMetaData(route)
  {
    var els = document.getElementsByTagName("head");
    if(els == null) return;
    var head = els[0];
    
    if(route.meta.title !== undefined)
    {
      var els2 = head.getElementsByTagName("title");
      if(els2 == null) return;
      var titleDom = els2[0];
      if(titleDom != null)
      {
        if(typeof route.meta.title === "function")
        {
          var text = route.meta.title();
          titleDom.textContent = text;
        }
        else
        {
          titleDom.textContent = route.meta.title;
        }
      }
    }
  }

  static setRoute(route, hash, isHistory)
  {
    if(isHistory === undefined || isHistory === false)
    {
      var path = route.path;
      if(hash !== undefined)
      {
        path += "#" + hash;
      }
      window.history.pushState({}, route.meta.title, path);
    }
    Router.setRouteMetaData(route);
    ReactDOM.render(route.dom(), document.getElementById("root"))
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  static handleClick(e)
  {
    console.log(e.target)
    var el = e.target;
    while(el != null && el.getAttribute("route") == null)
    {
      el = el.parentElement;
    }

    if(el != null)
    {
      var routeName = el.getAttribute("route");
      var hash = el.getAttribute("hash");
      
      if(routeName != null)
      {
        
        var route = Router.getRouteByName(routeName);
        if(route !== null)
        {
          console.log("setting roue")
          if(hash !== null && hash.length > 0)
          {
            Router.setRoute(route, hash);
          }
          else
          {
            Router.setRoute(route);
          }
        }
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        return false;
      }
      else
      {
        console.log("route.NOTfound", routeName);
      }
    }
  }

}

Router._routes = [];



export default Router;