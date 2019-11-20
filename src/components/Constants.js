import React, { Component } from 'react';
import './Category.css';

class Constants extends Component
{

  tableRows()
  {
    var arr = [];

    var values = this.props.data.values;

    if(this.props.isModifierFunc == false)
    {
      for(var i=0; i<values.length; i++)
      {
        var key = this.props.data.title + "_" + i;
        arr.push(
          <tr key={key}>
            <td>{values[i].name}</td>
            <td>{values[i].value}</td>
            <td>{values[i].description}</td>
          </tr>
        )
      }
    }
    else
    {
      for(var i=0; i<values.length; i++)
      {
        var key = this.props.data.title + "_" + i;
        arr.push(
          <tr key={key}>
            <td>{values[i].name}</td>
            <td>{values[i].value}</td>
            <td>{values[i].luafunction}</td>
            <td>{values[i].description}</td>
          </tr>
        )
      }
    }

    

    return arr;
  }

  getHeadings()
  {
    if(this.props.isModifierFunc == false)
    {
      return (
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th>Description</th>
        </tr>
      );
    }
    else
    {
      return (
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th>Lua Function</th>
          <th>Description</th>
        </tr>
      );
    }
  }

  render()
  {
    return(
      <div className="constants" id={this.props.data.title}>
        <div className="category-title">
          <h2>{this.props.data.title}</h2>
        </div>
        <table>
          <thead>
            {this.getHeadings()}
          </thead>
          <tbody>
            {this.tableRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Constants;
