import React, { useState } from "react";
import "./Match.css";

export default function Match(props) {
  // console.log("zis is brobs", props);
  console.log(
    props.info.participants[props.metadata.participants.indexOf(props.puuid)]
  );
  const player =
    props.info.participants[props.metadata.participants.indexOf(props.puuid)];
  const kda = player.kills + player.assists / player.deaths;
  return (
    <div className="match-container">
      <img
        className="champ-icon"
        src="https://tierlistmania.com/wp-content/uploads/2019/09/Zilean-Champion-Icon-League-Of-Legends.png"
        width="100px"
      />
      <div className="kda-container">
        <div>{player.championName}</div>
        <div>
          {player.kills}/{player.deaths}/{player.assists}
        </div>
        <div> CS : {player.totalMinionsKilled} KDA </div>
        <div>{Math.round(kda * 100) / 100} KDA </div>
      </div>
      <div className="build-container">
        <div>{props.info.gameMode || "loading"}</div>
        <div>{player.win ? "WIN" : "LOSE"}</div>
        <div>Basic Pings : {player.basicPings}</div>
      </div>
      <div className="items-container">
        <div>Vision Score : {player.visionScore}</div>
        <div>Wards Placed : {player.wardsPlaced}</div>
        <div>Wards Destroyed : {player.wardsKilled}</div>
      </div>
      <div className="teammates-container">
        <div>{player.individualPosition}</div>
        <div> Total Damage Dealt : {player.totalDamageDealt}</div>
        <div>Total Damage Taken : {player.totalDamageTaken}</div>
      </div>
    </div>
  );
}
