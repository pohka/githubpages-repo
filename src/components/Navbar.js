import React, { Component } from 'react';
import './Navbar.css';
import data from './../output.json';
import ScrollTo from "./Scroll";
import ApiSearch from "./ApiSearch.js";

class Navbar extends Component {
  constructor(props)
  {
    super(props);
    this.currentOption = this.props.menu;
    this.search="";
    this.state = { option : this.props.menu };
  }

  handleRowClick(e)
  {
    console.log("clicked", );
    var id = e.target.getAttribute("anchor-id");
    var path = window.location.pathname + "#" + id
    var title = "api - " + id
    window.history.pushState({}, title, path);
    ScrollTo(id);
  }
  
  getRows()
  {
    var arr = [];

    arr.push(<div className="api-nav-item api-nav-heading" key="h2-classes">Classes</div>);

    if(data.classes !== undefined)
    {
      if(this.currentOption == "all")
      {
        for(var i=0; i<data.classes.length; i++)
        {
          var key = "classes-" + i;
          arr.push(
            <div className="api-nav-item" key={key} anchor-id={data.classes[i].title} onClick={this.handleRowClick}>
              {data.classes[i].title}
            </div>
          );
        }
      }
      else
      {
        //sorted list of options
        var filterOptions = [
          "CDOTABaseAbility",
          "CDOTABaseGameMode",
          "CDOTAGamerules",
          "CDOTAPlayer",
          "CDOTA_Ability_Lua",
          "CDOTA_BaseNPC",
          "CDOTA_BaseNPC_Hero",
          "CDOTA_Buff",
          "CDOTA_Item",
          "CDOTA_Item_DataDriven",
          "CDOTA_Item_Lua",
          "CDOTA_MapTree",
          "CDOTA_Modifier_Lua",
          "CDOTA_PlayerResource",
          "CEntities",
          "CEntityInstance",
          "Global",
          "ProjectileManager",
          "Vector"
        ];
        var filterIndex = 0;
        for(var i=0; i<data.classes.length; i++)
        {
          if(data.classes[i].title === filterOptions[filterIndex])
          {
            filterIndex+=1;
            var key = "classes-" + i;
            arr.push(
              <div className="api-nav-item" key={key} anchor-id={data.classes[i].title} onClick={this.handleRowClick}>
                {data.classes[i].title}
              </div>
            );
          }
        }
      }
    }

    arr.push(<div className="api-nav-item api-nav-heading api-nav-heading-constants" key="h2-constants">Constants</div>);

    if(data.constants !== undefined)
    {
      if(this.currentOption == "all")
      {
        for (var i2 = 0; i2 < data.constants.length; i2++) {
          var key2 = "consts-" + i2;
          arr.push(
            <div className="api-nav-item" key={key2} anchor-id={data.constants[i2].title} onClick={this.handleRowClick}>
              {data.constants[i2].title}
            </div>
          );
        }
      }
      else
      {
        //sorted list of options
        var filterOptions2 = [
          "DOTATeam_t",
          "DOTAUnitAttackCapability_t",
          "DOTAUnitMoveCapability_t",
          "DOTA_ABILITY_BEHAVIOR",
          "DOTA_GameState",
          "DOTA_RUNES",
          "DOTA_UNIT_TARGET_FLAGS",
          "DOTA_UNIT_TARGET_TEAM",
          "DOTA_UNIT_TARGET_TYPE",
          "Find Types",
          "GameActivity_t",
          "ParticleAttachment_t",
          "modifierfunction",
          "modifierstate"
        ];
        var filterIndex2 = 0;

        for (var i2 = 0; i2 < data.constants.length; i2++)
        {
          if(data.constants[i2].title === filterOptions2[filterIndex2])
          {
            filterIndex2+=1;
            var key2 = "consts-" + i2;
            arr.push(
              <div className="api-nav-item" key={key2} anchor-id={data.constants[i2].title} onClick={this.handleRowClick}>
                {data.constants[i2].title}
              </div>
            );
          }
        }
      }
    }

    return arr;
  }

  componentDidMount()
  {
    if(window.location.hash > 0) 
    {
      ScrollTo(window.location.hash);
    }
  }

  handleMenuClick(e, comp)
  {
    var option = e.target.getAttribute("option");
    comp.currentOption = option;
    comp.setState({option: option})
  }

  getMenu()
  {
    var items = ["all", "common"];
    var itemEls = [];
    for(let i=0; i<items.length; i++)
    {
      var isActive = (items[i] === this.currentOption);
      let text = items[i].charAt(0).toUpperCase() + items[i].slice(1);
      var className = "sidenav-menu-item no-select";
      if(isActive)
      {
        className += " active"
      }
      itemEls.push(
        <div className={className} key={items[i]} onClick={(e)=>{this.handleMenuClick(e, this)}} option={items[i]}>{text}</div>
      )
    }

    return(
      <div className="sidenav-menu">
        {itemEls}
      </div>
    )
  }

  handleSearchInput(e, comp)
  {
    var val = e.target.value;
    comp.search = val;
    comp.forceUpdate();
  }

  render()
  {
    return(
      <div className="navbar">
        
        <div className="sidenav-search">
          <div className="search-icon no-select">></div>
          <input type="text" id="searchbar" placeholder="search.." onChange={(e)=>{this.handleSearchInput(e, this)}}></input>
        </div>
        <ApiSearch search={this.search}></ApiSearch>
        {this.getMenu()}
        <div className="navbar-rows-con">{this.getRows()}</div>
      </div>
    );
  }
}

export default Navbar;
