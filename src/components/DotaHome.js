import React, { Component } from 'react';
import "./DotaHome.css";
import Markdown from 'markdown-to-jsx';

class DotaHome extends Component
{
  constructor(props)
  {
    super(props);
    this.markdown = "";
  }

  componentDidMount()
  {
    var comp = this;
    fetch('/markdown/dota/quick-start.md').then(function (response) {
      return response.text();
    }).then(function (text) {
      comp.markdown = text;
      comp.forceUpdate();
    }).catch(function (err) {
      comp.markdown = "error loading page";
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

export default DotaHome;
