
import React, { Component } from 'react';
import './MainNav.css';

class MainNavbar extends Component {

  render()
  {
    return(
      <div>
        <div className="main-nav-con">
          <div className="main-nav">
            <a href="/api" className="main-nav-item">API</a>
            <a href="/kv-checker" className="main-nav-item">KV Checker</a>
          </div>
        </div>
      </div>
    )
  }
}

export default MainNavbar;