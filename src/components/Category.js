import React, { Component } from 'react';
import './Category.css';
import { Icon } from 'react-icons-kit'
import {externalLink} from 'react-icons-kit/fa/externalLink'

class Category extends Component
{
  tableRows(tableName)
  {
    var rows = [];

    var i=0;
    var funcs = this.props.data.funcs;
    for(var func in funcs)
    {
      var key = this.props.name + "_" + i;

      var id = this.props.name + "_" + func;

      var href = "https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/API/" +
        this.props.data.title + "." + func;

      rows.push(
        <tr key={key} id={id}>
          <td className="col-function">
            {func}
            <a href={href} className="func-api-link" target="_blank"  rel="noopener noreferrer"><Icon size={20} icon={externalLink} /></a>
          </td>
          <td className="col-signature"><code>{funcs[func].signature}</code></td>
          <td className="col-class-desc">{funcs[func].description}</td>
        </tr>
      );
      i++;
    }
    
    return rows;
  }

  getExtends()
  {
    var str = "";

    if (this.props.data.extends !== undefined && this.props.data.extends !== "")
    {
      str = "extends " + this.props.data.extends;
    }

    return str;
  }

  getDescription()
  {
    var result = [];
    if(this.props.data.description !== "")
    {
      result.push(
        <div key="desc">{this.props.data.description}</div>
      );
    }
    if (this.props.data.accessor !== "")
    {
      result.push(
        <div key="accessor">Global Accessor: {this.props.data.accessor}</div>
      );
    }

    return result;
  }

  render()
  {
    return (
      <div className="category" id={this.props.data.title}>
          <div className="category-title">
            <h2>{this.props.data.title}</h2>
            <div className="category-extends">{this.getExtends()}</div>
            <div className="category-desc">{this.getDescription()}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Function</th>
                <th>Signature</th>
                <th className="col-class-desc">Description</th>
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

export default Category;
