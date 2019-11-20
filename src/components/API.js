import React, { Component } from 'react';
import data from './../output.json';
import Category from './Category';
import Constants from './Constants';
import ScrollTo from "./Scroll";

class API extends Component {

  getCategorys() 
  {
    var arr = [];

    for (var i = 0; i < data.classes.length; i++)
    {
      var key = data.classes[i].title;
      arr.push(<Category data={data.classes[i]} key={key}></Category>)
    }

    arr.push(<h2 className="constants-title" key="constants-title">Constants</h2>);

    for (var i2 = 0; i2 < data.constants.length; i2++)
    {
      var key2 = data.constants[i2].title;
      var isModifierFunc = (key2 === "modifierfunction")
      arr.push(<Constants data={data.constants[i2]} key={key2} isModifierFunc={isModifierFunc}></Constants>);
    }

    return arr;
  }

  //scroll to anchors
  componentDidMount()
  {
    var hash = window.location.hash;
    if(hash.length > 0)
    {
      console.log("api scroll")
      var id = hash.substr(1);
      ScrollTo(id);
      var path = window.location.pathname + "#" + id;
      var title = "api - " + id;
      window.history.pushState({}, title, "#"+id);
     // var el = document.getElementById(id);
     // el.scrollIntoView(true);
     
    }
  }

  render()
  {
    return (
      <div className="tables">
        {this.getCategorys()}
      </div>
    );
  }
}

export default API;
