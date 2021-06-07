
const BASE_URL = "https://open.faceit.com/data/v4";
const CLIENT_KEY = "05262bed-3ae2-4a8b-be40-691f5242cdb9";

export const getUserInfo = async (steamId) => {
   return await fetchData(`/players?game_player_id=${steamId}&game=csgo`);
};

export const getUserDetailedStats = async (steamId) => {
   let user = await fetchData(`/players?game_player_id=${steamId}&game=csgo`);
   return await fetchData(`/players/${user['player_id']}/stats/csgo`);
};

async function fetchData(path) {
   try {
      const options = { headers: {
         'accept': 'application/json',
         'Authorization': `Bearer ${CLIENT_KEY}`
      } };

      const response = await fetch(BASE_URL + path, options);
      const json = await response.json();

      return json;
   } catch(err) {
      console.error(err);
      return null;
   }
}

