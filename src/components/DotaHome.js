import React, { Component } from 'react';
import "./DotaHome.css";
import { Icon } from 'react-icons-kit'
import {code} from 'react-icons-kit/fa/code'
import {book} from 'react-icons-kit/icomoon/book'
import {wrench} from 'react-icons-kit/icomoon/wrench'
import Router from "./../Router"

class DotaHome extends Component
{
  constructor(props)
  {
    super(props);
    this.markdown = "";
    this.data = [
      {
        section : "Libraries",
        icon : "code",
        items : [
          {
            title : "Query",
            route : "dota-libs",
            hash : "query",
            desc : "Functions to simplify searching"
          },
          {
            title : "Game Setup",
            route : "dota-libs",
            hash : "game-setup",
            desc : "Quick loading into custom games"
          },
          {
            title : "Task",
            route : "dota-libs",
            hash : "task",
            desc : "Delay a function call or execute a function repeatitivly with a delay"
          },
          {
            title : "VMath",
            route : "dota-libs",
            hash : "vmath",
            desc : "Vector math functions"
          },
          {
            title : "Camera",
            route : "dota-libs",
            hash : "camera",
            desc : "Controlling the focus of the camera"
          }
        ]
      },
      {
        section : "Guides",
        icon : "book",
        items : [
          {
            title : "Simple Lua Ability",
            route : "dota-libs",
            hash : "simple-lua-ability",
          },
          {
            title : "Ultimate Hotkey Fix",
            route : "dota-libs",
            hash : "ultimate-hotkey",
          },
        ]
      },
      {
        section : "Tools",
        icon : "wrench",
        items : [
          {
            title : "API",
            route : "dota-api"
          },
          {
            title : "KV Checker",
            route : "dota-kv-checker"
          }
        ]
      }
    ]
  }

  getItem(item, icon)
  {
    var route = Router.getRouteByName(item.route);
    if(route != null)
    {
      var path = route.path;
      var iconDOM = null;
      var iconContainerClassName = "dota-home-item-icon-small";
      if(icon === "code")
      {
        iconDOM = (<Icon size={28} icon={code} />);
        iconContainerClassName = "dota-home-item-icon";
      }
      else if(icon === "book")
      {
        iconDOM = (<Icon size={18} icon={book} />);
      }
      else if(icon === "wrench")
      {
        iconDOM = (<Icon size={18} icon={wrench} />);
      }

      if(item.hash !== undefined)
      {
        path += "#" + item.hash;
      }
      else
      {
        item.hash = "";
      }

      var descDOM = "";
      if(item.desc !== undefined)
      {
        descDOM = (<div className="dota-home-item-desc">{item.desc}</div>);
      }

      return(
        <a href={path} route={item.route} hash={item.hash} onClick={Router.handleClick}>
          <div className={iconContainerClassName}>
            {iconDOM}
          </div>
          <div className="dota-home-item-title">{item.title}</div>
          {descDOM}
        </a>
      );
    }
  }

  getSections()
  {
    var content = [];
    for(var i=0; i<this.data.length; i++)
    {
      var section = this.data[i];
      content.push(<h2>{section.section}</h2>);
      for(var b=0; b<section.items.length; b++)
      {
        var item = this.getItem(section.items[b], section.icon);
        content.push(item);
      }
    }
    return content;
  }

  render()
  {
    return(
      <div className="dota-home-con">
        {this.getSections()}
      </div>
    );
  }
}

export default DotaHome;
