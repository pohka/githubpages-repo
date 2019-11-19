
import React, { Component } from 'react';
import './KV.css';
import KVChecker from "../KVChecker"
import { tsImportEqualsDeclaration } from '@babel/types';

class KVPage extends Component {
  constructor(props)
  {
    super(props);
    this.errs = null;
    this.state = { flag : false }; //flip the flag when their is a change
    this.autoH = 500; //value for style height
  }


  handleChange(cls, e)
  {
    var value =  e.target.value;
    cls.errs = KVChecker.validate(value);
    cls.setState({flag : !cls.state.flag });
  }

  getOutput()
  {
    if(this.errs == null)
    {
      return(<div className="output">
        <span>output here</span>
      </div>
      )
    }
    else
    {
      if(this.errs.length == 0)
      {
        return (
          <div className="output">
            <span className="kv-success">Success! Your KV file is valid</span>
          </div>
        );
      }
      else
      {
        var arr = [];
        for(var i=0; i <this.errs.length; i++)
        {
          var key = "err_" + i;
          arr.push(
            <span key={key} className="kv-error">{this.errs[i]}</span>
          );
        }
        return (<div className="output">{arr}</div>);
      }
    }
  }

  getLinesNums()
  {
    var el = document.getElementById("kv-input");
    if(el != null)
    {
      var arr = [];
      var lineCount = el.value.split("\n").length;
      this.autoH = ((lineCount+1) * 16);
      if(this.autoH < 500)
      {
        this.autoH = 500;
      }
      //console.log("linecount:", lineCount, el.textContent);
      for(var i=1; i<=lineCount || i<1; i++)
      {
        let key = "line-" + i;
        arr.push(<span key={key}>{i}</span>);
      }

      return arr;
    }

    return (<span key="line-1">1</span>);
  }


  render()
  {
    var lineNums = this.getLinesNums(); //get dom
    //auto resize textarea style
    var style = {
      height: this.autoH
    }
     
    return(
      <div>
        <div className="kv-con">
          <div className="kv-section kv-section-left">
            <div className="code-text-wrapper" id="in">
              <div className="code-line-nums" id="in-nums">
                {lineNums}
              </div>
              <textarea 
              id="kv-input"
              class="no-select"
               placeholder="Paste or edit your KV file here.." 
               onChange={ (e)=>{this.handleChange(this,e) }}
               style={style}
               ></textarea>
            </div>
          </div>
          <div className="kv-section kv-section-right">
            <div>{this.getOutput()}</div>
          </div>
        </div>
      </div>
    );

    
  }

}

export default KVPage;
