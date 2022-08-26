import React from "react";
import "./NavBar.css";
import leagueIcon from "../Images/league_icon.png";

export default function NavBar(props) {
  // const []
  return (
    <div className="navbar">
      <img src={leagueIcon} width="100px" />
      <span className="logo-title">Find My Account</span>
      <span className="region-title"> Change Region</span>
      <button className="mode-selector" onClick={props.change}>
        Dark mode
      </button>
    </div>
  );
}
