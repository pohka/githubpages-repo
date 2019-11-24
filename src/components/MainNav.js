
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
            <div className="main-nav-left">
              <b href="/dota/" route="dota-home" className="main-nav-item" onClick={Router.handleClick}>Home</b>
              <b href="/dota/api" route="dota-api" className="main-nav-item" onClick={Router.handleClick}>API</b>
            </div>
              <div className="main-nav-middle-item">
                <svg width="100%" height="100%" viewBox="0 0 60 60" version="1.1">
                    <path  d="m0 0v60h60v-60zm13.684 12.15h1.3652c12.838 8.822 25.78 17.161 36.201 24.701 0 0-1.0363 6.479-2.5078 9.0781-0.63806 1.1151-0.77342 1.2537-1.3301 1.3457-0.72037 0.1196-1.0603 0.10993-2.625-0.07227-2.0858-0.2429-3.8617-1.0164-4.6504-2.0254-0.18823-0.2407-1.5478-1.7241-3.0195-3.2969-7.366-8.015-16.718-18.001-25.383-26.842-1.7806-1.901-1.7345-1.687-0.496-2.33 0.9575-0.4968 1.2348-0.55859 2.4453-0.55859zm30.15 0.29492c1.4179-0.1406 2.3806 0.95875 3.7383 1.916-0.21708 2.795-0.64371 5.1401-0.95703 7.0215-0.09875 0.5921-0.43908 0.82652-0.75 0.51563-3.5882-2.553-6.5606-4.7523-9.7969-7.4512 2.4981-0.74285 5.2772-1.6358 7.7656-2.002zm-29.428 22.906c4.2082 3.8936 7.892 7.3041 10.496 10.211-2.6436 1.0896-5.2998 1.6688-8.3477 2.502-0.74775-0.1265-2.2715-1.31-3.291-2l-2.4355-1.8223c-0.5571-0.78621-0.19277-1.2177 3.5781-8.8906z"></path>
                </svg>
              </div>
            <div className="main-nav-right">
              <b href="/dota/kv-checker" route="dota-kv-checker" className="main-nav-item"  onClick={Router.handleClick}>KV Checker</b>
              <b href="/dota/videos" route="dota-videos" className="main-nav-item" onClick={Router.handleClick}>Videos</b>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MainNavbar;