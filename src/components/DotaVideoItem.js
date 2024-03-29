import React, { Component } from 'react';

class DotaVideoItem extends Component
{
  constructor(props)
  {
    super(props)
    this.src = "https://img.youtube.com/vi/"+props.id+"/mqdefault.jpg";
    this.link = "https://www.youtube.com/watch?v=" + props.id;
  }
  render(){
    return(
      <a href={this.link} target="_blank" className="dota-video-item">
        
        <div className="dota-video-title">{this.props.title}</div>
        <div className="play-btn"><img src="../play-btn.png"></img></div>
        <div className="dota-video-media">
          <img src={this.src}></img>
        </div>
        
      </a>
    )
  }
}

export default DotaVideoItem;