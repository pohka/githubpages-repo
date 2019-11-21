import React, { Component } from 'react';
import "./ApiSearch.css";
import data from './../output.json';
import ScrollTo from "./Scroll";

class ApiSearch extends Component
{
  handleClick(e)
  {
    var id = e.target.getAttribute("scrollid");
    var offset = e.target.getAttribute("scrollOffset");
    if(offset == null)
    {
      offset = 0;
    }
    else
    {
      offset = parseInt(offset)
    }
    console.log("scrolling to:", id);
    ScrollTo(id, offset);
  }

  search()
  {
    var result = [];
    var query = this.props.search.toLowerCase();
    if(query.length > 2)
    {
      for(let i=0; i<data.classes.length; i++)
      {
        let title = data.classes[i].title.toLowerCase();
        if(title.includes(query))
        {
          result.push(
            <div className="apisearch-item" scrollid={data.classes[i].title} onClick={this.handleClick}>
              {data.classes[i].title}
            </div>
          );
        }
      }
      
      for(let j=0; j<data.constants.length; j++)
      {
        let title = data.constants[j].title.toLowerCase();
        if(title.includes(query))
        {
          result.push(
            <div className="apisearch-item" scrollid={data.constants[j].title} onClick={this.handleClick}>
              {data.constants[j].title}
            </div>
          );
        }
      }

      for(let a=0; a<data.classes.length; a++)
      {
        let className = data.classes[a].title;
        for(let key in data.classes[a].funcs)
        {
          let funcName = key.toLowerCase();
          if(funcName.includes(query))
          {
            var text =  className + ":" + key;
            var scrollID = className + "-" + key;
            result.push(
              <div className="apisearch-item" scrollid={scrollID} scrollOffset="-6" onClick={this.handleClick}>
                {text}
              </div>
            );
          }
        }
      }
    }
    return result;
  }

  render(){
    var className = "apisearch-con";
    if(this.props.search.length > 2)
    {
      className += " active";
    }

    return(
      <div className={className}>
        {this.search()}
      </div>
    )
  }
}

export default ApiSearch;