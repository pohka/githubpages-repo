import React, { Component } from 'react';
import './Navbar.css';
import data from './../output.json';
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

    arr.push(<div className="api-nav-item api-nav-heading" key="h2-classes">Classes</div>);

    if(data.classes !== undefined)
    {
      for(var i=0; i<data.classes.length; i++)
      {
        var key = "classes-" + i
        arr.push(
          <div className="api-nav-item" key={key} anchor-id={data.classes[i].title} onClick={this.handleRowClick}>
            {data.classes[i].title}
          </div>
        );
      }
    }

    arr.push(<div className="api-nav-item api-nav-heading api-nav-heading-constants" key="h2-constants">Constants</div>);

    if(data.constants !== undefined)
    {
      for (var i = 0; i < data.constants.length; i++) {
        var key = "consts-" + i
        arr.push(
          <div className="api-nav-item" key={key} anchor-id={data.constants[i].title} onClick={this.handleRowClick}>
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
      <div className="navbar">
        <div className="navbar-rows-con">{this.getRows()}</div>
      </div>
    );
  }
}

export default Navbar;
