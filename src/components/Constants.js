import React, { Component } from 'react';
import './Category.css';

class Constants extends Component
{

  tableRows()
  {
    var arr = [];

    var values = this.props.data.values;
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

    return arr;
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
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
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
