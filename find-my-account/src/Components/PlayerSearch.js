import React, { useEffect } from "react";
import "./PlayerSearch.css";
import SummonerCard from "./SummonerCard";
import playerDB from "./PlayerDB.json";
import Match from "./Match";
import PlayerNotFound from "./PlayerNotFound";

export default function PlayerSearch() {
  console.log("comp rendered");
  const api_token = `api_key=${process.env.REACT_APP_AUTH_TOKEN}`;
  const api_url = "https://euw1.api.riotgames.com";
  const api_account_parameters = "/lol/summoner/v4/summoners/by-name/";
  const api_matches_url =
    "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/";
  const api_matches_options = "/ids?start=0&count=15&";
  const api_matches_details =
    "https://europe.api.riotgames.com/lol/match/v5/matches/";
  const [formToggle, setFormToggle] = React.useState(true);
  const [formData, setFormData] = React.useState({
    summonerName: "",
    summonerRegion: "",
  });
  const [notFoundToggle, setNotFoundToggle] = React.useState(false);
  const [playerData, setPlayerData] = React.useState({
    id: "",
    accountId: "",
    puuid: "",
    name: "",
  });
  const [apiData, setApiData] = React.useState({});
  const [matchesData, setMatchesData] = React.useState([]);

  function handleChange(event) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormToggle(false);
  }
  useEffect(() => {
    async function fetchData() {
      let rawPlayerData;

      try {
        rawPlayerData = await fetch(
          `${api_url}${api_account_parameters}${formData.summonerName}?${api_token}`
        );
      } catch (error) {
        console.log("No players found");
        setNotFoundToggle(true);
        // if (error.status.status_code === 404) {
        // }
      }

      const objectPlayerData = await rawPlayerData.json();

      // console.log(objectPlayerData);
      // setFormToggle((prevState) => !prevState);
      setPlayerData(objectPlayerData);
      const rawPlayerMatchesData = await fetch(
        `${api_matches_url}${objectPlayerData.puuid}${api_matches_options}${api_token}`
      );

      const objectPlayerMatchData = await rawPlayerMatchesData.json();
      const rawGamesData = await Promise.all(
        objectPlayerMatchData.map((matchId) => {
          return fetch(`${api_matches_details}${matchId}?${api_token}`).then(
            (response) => response.json()
          );
        })
      );
      setMatchesData(
        rawGamesData.map((item) => {
          return (
            <Match
              key={item.metadata.matchId}
              {...objectPlayerData}
              {...item}
            />
          );
        })
      );
    }
    if (!formToggle) {
      console.log("isnise the useeffect");
      fetchData();
    }
  }, [formToggle]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {formToggle && (
          <div>
            <h1 className="search-title">Enter Summoner Name</h1>
            <input
              name="summonerName"
              type="text"
              placeholder="  type the name here..."
              value={formData.summonerName}
              onChange={handleChange}
            />
            <select
              name="summonerRegion"
              value={formData.summonerRegion}
              onChange={handleChange}
            >
              <option value="null">-- Select Region --</option>
              <option value="EUW">EUW</option>
              <option value="NA">NA</option>
              <option value="KOREA">KOREA</option>
              <option value="EUNE">EUNE</option>
            </select>
            <br></br>
            <button>Find Summoner</button>
          </div>
        )}
      </form>
      {!formToggle && !notFoundToggle && <SummonerCard {...playerData} />}
      {notFoundToggle && <PlayerNotFound />}
      {!formToggle && !notFoundToggle && (
        <div className="matches-container">{matchesData}</div>
      )}
    </div>
  );
}
