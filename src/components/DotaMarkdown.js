import React, { Component } from 'react';
import "./DotaHome.css";
import Markdown from '../markdown-parser.js';

class DotaMarkdown extends Component
{
  constructor(props)
  {
    super(props);
    this.markdown = "";
  }

  componentDidMount()
  {
    var hash = window.location.hash.substr(1);
    var file = "/markdown/dota/" + hash + ".md";
    console.log("hash:" +hash, file);
    var comp = this;
    fetch(file).then(function (response) {
      return response.text();
    }).then(function (text) {
      comp.markdown = text;
      comp.forceUpdate();
    }).catch(function (err) {
      comp.markdown = "page does not exist";
      console.warn('fetch failed', err);
      comp.forceUpdate();
    });
  }

  render()
  {
    

    return(
      <div className="dota-home-con">
        <Markdown>{this.markdown}</Markdown>
      </div>
    );
  }
}

export default DotaMarkdown;
