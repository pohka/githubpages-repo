import React, { Component } from 'react';
import DotaVideoItem from "./DotaVideoItem";
import "./DotaVideo.css";

class DotaVideoCon extends Component
{
  constructor(props)
  {
    super(props);
    this.data = [
      { id : "kzj9yM_9zAw", title : "Getting Started" },
      { id : "lByUEqXgK-E", title : "Key Values" },
      { id : "Umo8-0HzW3o", title : "Custom Lua Ability" },
      { id : "DNS4A-CCJA0", title : "Lua Abilities in Detail" },
      { id : "yqNsHSii6dg", title : "GameRules and GameMode" },
      { id : "PwT6_JIQxDI", title : "Ability Events and Projectiles" },
      { id : "N-jLShhlaPk", title : "Lua Modifiers" },
      { id : "Qn2cXXwAZwo", title : "Thinkers" },
      { id : "jMJlts_8GHc", title : "Game Events and Sounds" },
      { id : "0GtIHxxdb0s", title : "Advanced Hammer" },
     // { id : "", title : "" },
    ];
  }
  render(){
    var items = [];
    for(var i=0; i<this.data.length; i++)
    {
      items.push(
        <DotaVideoItem
          key={i}
          id={this.data[i].id}
          title={this.data[i].title}>
        </DotaVideoItem>
      )
    }

    return(
    <div className="dota-video-con">
      {items}
    </div>)
  }
}

export default DotaVideoCon;