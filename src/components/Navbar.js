import React, { Component } from 'react';
import './Navbar.css';
import data from './../output.json';
import ScrollTo from "./Scroll";

class Navbar extends Component {

  handleRowClick(e)
  {
    console.log("clicked", );
    var id = e.target.getAttribute("anchor-id");
    var path = window.location.pathname + "#" + id
    var title = "api - " + id
    window.history.pushState({}, title, path);
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
      for (var i2 = 0; i2 < data.constants.length; i2++) {
        var key2 = "consts-" + i2
        arr.push(
          <div className="api-nav-item" key={key2} anchor-id={data.constants[i2].title} onClick={this.handleRowClick}>
            {data.constants[i2].title}
          </div>
        );
      }
    }

    return arr;
  }

  componentDidMount()
  {
    if(window.location.hash > 0) 
    {
      ScrollTo(window.location.hash);
    }
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
