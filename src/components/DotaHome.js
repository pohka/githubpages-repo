import React, { Component } from 'react';
import "./DotaHome.css";
import { Icon } from 'react-icons-kit'
import {code} from 'react-icons-kit/fa/code'
import {book} from 'react-icons-kit/icomoon/book'
import {wrench} from 'react-icons-kit/icomoon/wrench'

class DotaHome extends Component
{
  constructor(props)
  {
    super(props);
    this.markdown = "";
  }

  render()
  {
    return(
      <div className="dota-home-con">
        <h2>Libraries</h2>
        <a href="/dota/libs#query">
          <div className="dota-home-item-icon"><Icon size={28} icon={code} /></div>
          <div className="dota-home-item-title">Query</div>
          <div className="dota-home-item-desc">Functions to simplify searching</div>
        </a>
        <a href="/dota/libs#quick-loading">
          <div className="dota-home-item-icon"><Icon size={28} icon={code} /></div>
          <div className="dota-home-item-title">GameSetup</div>
          <div className="dota-home-item-desc">Quick loading into custom games</div>
        </a>
        <a href="/dota/libs#task">
          <div className="dota-home-item-icon"><Icon size={28} icon={code} /></div>
          <div className="dota-home-item-title">Task</div>
          <div className="dota-home-item-desc">Delay a function call or execute a function repeatitivly with a delay</div>
        </a>
        <a href="/dota/libs#vmath">
          <div className="dota-home-item-icon"><Icon size={28} icon={code} /></div>
          <div className="dota-home-item-title">VMath</div>
          <div className="dota-home-item-desc">Vector math functions</div>
        </a>
        <a href="/dota/libs#camera">
          <div className="dota-home-item-icon"><Icon size={28} icon={code} /></div>
          <div className="dota-home-item-title">Camera</div>
          <div className="dota-home-item-desc">Controlling the focus of the camera</div>
        </a>
        <h2>Guides</h2>
        <a href="/dota/libs#simple-lua-ability">
          <div className="dota-home-item-icon-small"><Icon size={18} icon={book} /></div>
          <div className="dota-home-item-title">Simple Lua Ability</div>
        </a>
        <a href="/dota/libs#ultimate-hotkey">
          <div className="dota-home-item-icon-small"><Icon size={18} icon={book} /></div>
          <div className="dota-home-item-title">Ultimate Hotkey Fix</div>
        </a>

        <h2>Tools</h2>
        <a href="/dota/api">
          <div className="dota-home-item-icon-small"><Icon size={18} icon={wrench} /></div>
          <div className="dota-home-item-title">API</div>
        </a>
        <a href="/dota/kv-checker">
        <div className="dota-home-item-icon-small"><Icon size={18} icon={wrench} /></div>
        <div className="dota-home-item-title">KV Checker</div>
        </a>
      </div>
    );
  }
}

export default DotaHome;
