import React, { Component } from 'react';
import './Category.css';

class Constants extends Component
{

  tableRows()
  {
    var arr = [];

    var values = this.props.data.values;

    if(this.props.isModifierFunc === false)
    {
      for(var i=0; i<values.length; i++)
      {
        var key = this.props.data.title + "_" + i;
        arr.push(
          <tr key={key}>
            <td className="constants-name">{values[i].name}</td>
            <td>{values[i].value}</td>
            <td>{values[i].description}</td>
          </tr>
        )
      }
    }
    else
    {
      for(var i2=0; i2<values.length; i2++)
      {
        var key2 = this.props.data.title + "_" + i2;
        arr.push(
          <tr key={key2}>
            <td className="constants-name">{values[i2].name}</td>
            <td>{values[i2].value}</td>
            <td>{values[i2].luafunction}</td>
            <td>{values[i2].description}</td>
          </tr>
        )
      }
    }

    

    return arr;
  }

  getHeadings()
  {
    if(this.props.isModifierFunc === false)
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
        <div className="constants-item-title">
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
