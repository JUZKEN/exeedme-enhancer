
const BASE_URL = "https://api.exeedme.com/api";

export const getPlayersEloInLobby = async (lobbyId) => {
   let lobby = await fetchData(`/lobbies/${lobbyId}`);
   let eloRatings = [];
   lobby['players'].forEach(player => {
      eloRatings.push({
         playerId: player['playerId'],
         elo: player['player']['eloRatings'][0]['elo']
      })
   });
   return eloRatings;
};

function getToken() {
   return window.localStorage.getItem('token') ?? null;
}

async function fetchData(path) {
   const token = getToken();
   if (!token) return;
   try {
      const options = { headers: {
         'accept': 'application/json',
         'Authorization': token
      } };

      const response = await fetch(BASE_URL + path, options);
      const json = await response.json();

      return json;
   } catch(err) {
      console.error(err);
      return null;
   }
}

