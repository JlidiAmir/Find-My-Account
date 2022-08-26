import React from "react";
import "./SummonerCard.css";
import leagueIcon from "../Images/league_icon.png";

export default function SummonerCard(props) {
  return (
    <div className="summoner-card">
      <img
        className="summoner-icon"
        src={`http://ddragon.leagueoflegends.com/cdn/12.15.1/img/profileicon/${props.profileIconId}.png`}
      />
      <br></br>
      <span className="summoner-name"> Summoner name : {props.name}</span>
      <span className="summoner-level">
        {" "}
        Summoner level : {props.summonerLevel}
      </span>
    </div>
  );
}
