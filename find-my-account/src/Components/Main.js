import React from "react";
import "./Main.css";

import PlayerSearch from "./PlayerSearch";

export default function Main(props) {
  return (
    <main className={props.darkMode ? "dark-mode" : "light-mode"}>
      <PlayerSearch />
    </main>
  );
}
