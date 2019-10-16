import React, { Component } from 'react';
import data from './../extractedData.json';
import Category from './Category';
import Constants from './Constants';
import ScrollTo from "./Scroll";

class API extends Component {

  getCategorys() 
  {
    var arr = [];

    for (var i = 0; i < data.classes.length; i++) {
      var key = data.classes[i].title;
      arr.push(<Category data={data.classes[i]} key={key}></Category>)
    }

    arr.push(<h2 className="constants-title" key="constants-title">Constants</h2>);

    for (var i = 0; i < data.constants.length; i++) {
      var key = data.constants[i].title;
      arr.push(<Constants data={data.constants[i]} key={key}></Constants>);
    }

    return arr;
  }

  //scroll to anchors
  componentDidMount()
  {
    var hash = window.location.hash;
    if(hash.length > 0)
    {
      var id = hash.substr(1);
      ScrollTo(id);
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