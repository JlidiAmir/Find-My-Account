async function handleSubmit(event) {
  event.preventDefault();
  let rawPlayerData;

  try {
    rawPlayerData = await fetch(
      `${api_url}${api_account_parameters}${formData.summonerName}?${api_token}`
    );
  } catch (error) {
    console.log("No players found");
    setFormToggle(false);
    setNotFoundToggle(true);
    // if (error.status.status_code === 404) {
    // }
  }

  const objectPlayerData = await rawPlayerData.json();

  console.log(objectPlayerData);
  setFormToggle((prevState) => !prevState);
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
        <Match key={item.metadata.matchId} {...objectPlayerData} {...item} />
      );
    })
  );
}
