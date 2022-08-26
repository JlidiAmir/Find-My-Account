function handleSubmit(event) {
  event.preventDefault();
  let playersolution;

  fetch(
    `${api_url}${api_account_parameters}${formData.summonerName}?${api_token}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      playersolution = data;
      setFormToggle((prevState) => !prevState);
      setPlayerData(data);
      return fetch(
        `${api_matches_url}${data.puuid}${api_matches_options}${api_token}`
      );
    })
    .then((response) => {
      // console.log(response, "matches");
      return response.json();
    })
    .then((matches) => {
      const x = matches.map((matchId) => {
        return fetch(`${api_matches_details}${matchId}?${api_token}`).then(
          (response) => response.json()
        );
      });

      // console.log("the result of the promise all", v);
      return Promise.all(x);
    })
    .then((values) => {
      // console.log(values, "the vbaluesss");
      setMatchesData(
        values.map((item) => {
          return (
            <Match key={item.metadata.matchId} {...playersolution} {...item} />
          );
        })
      );
    })
    .catch((error) => {
      console.log("No players found");
      setFormToggle(false);
      setNotFoundToggle(true);
      // if (error.status.status_code === 404) {
      // }
    });
}
