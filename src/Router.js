import React, { Component } from 'react';
import App from './App';
import ReactDOM from 'react-dom';


class Router extends Component
{
  static init()
  {
    window.addEventListener("popstate", function(e) {
      let route = Router.findRouteMatch(e.target.location.pathname);
      Router.setRoute(route);
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
      if(Router._routes[i].name == name)
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
      if (Router._routes[i].path == path)
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
    if (route == null) 
    {
      return (<div>Page not Found</div>);
    }

    return route.dom();
  }

  static setRoute(route)
  {
    window.history.pushState({}, route.meta.title, route.path);
    ReactDOM.render(route.dom(), document.getElementById("root"))
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    
  }

  static handleClick(e)
  {
    var routeName = e.target.getAttribute("route");
    if(routeName != null)
    {
      var route = Router.getRouteByName(routeName);
      if(route != null)
      {
        Router.setRoute(route);
      }
    }
  }

}

Router._routes = [];



export default Router;