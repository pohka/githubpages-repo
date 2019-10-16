import React, { Component } from 'react';
import './Navbar.css';
import data from './../extractedData.json';
import ScrollTo from "./Scroll";

class Navbar extends Component {

  handleRowClick(e)
  {
    console.log("clicked", );
    var id = e.target.getAttribute("anchor-id");
    ScrollTo(id);
  }
  
  getRows()
  {
    var arr = [];

    arr.push(<div className="api-nav-item api-nav-heading">Classes</div>);

    if(data.classes !== undefined)
    {
      for(var i=0; i<data.classes.length; i++)
      {
        arr.push(
          <div className="api-nav-item" anchor-id={data.classes[i].title} onClick={this.handleRowClick}>
            {data.classes[i].title}
          </div>
        );
      }
    }

    arr.push(<div className="api-nav-item api-nav-heading api-nav-heading-constants">Constants</div>);

    if(data.constants !== undefined)
    {
      for (var i = 0; i < data.constants.length; i++) {
        arr.push(
          <div className="api-nav-item" anchor-id={data.constants[i].title} onClick={this.handleRowClick}>
            {data.constants[i].title}
          </div>
        );
      }
    }

    return arr;
  }

  render()
  {
    return(
      <div className="navbar">{this.getRows()}</div>
    );
  }
}

export default Navbar;
