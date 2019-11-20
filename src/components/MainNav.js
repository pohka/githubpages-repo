
import React, { Component } from 'react';
import './MainNav.css';
import Router from "../Router"

class MainNavbar extends Component {

  render()
  {
    return(
      <div>
        <div className="main-nav-con">
          <div className="main-nav">
            <b href="/dota/api" route="dota-api" className="main-nav-item" onClick={Router.handleClick}>API</b>
            <b href="/dota/kv-checker" route="dota-kv-checker" className="main-nav-item"  onClick={Router.handleClick}>KV Checker</b>
          </div>
        </div>
      </div>
    )
  }
}

export default MainNavbar;