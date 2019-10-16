import React, { Component } from 'react';


class Router extends Component
{
  
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
}

Router._routes = [];



export default Router;