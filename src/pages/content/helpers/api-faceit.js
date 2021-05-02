
const BASE_URL = "https://open.faceit.com/data/v4";
const CLIENT_KEY = "05262bed-3ae2-4a8b-be40-691f5242cdb9";

export const getUserStats = async (steamId) => {
   // Search for user using the steam id
   const res = await fetchData(`/search/players?nickname=${steamId}&offset=0&limit=20`);

   if (!res['items'].length) {
      return null;
   }

   const playerNickname = res['items'][0]['nickname'];
   const playerStats = await fetchData(`/players?nickname=${playerNickname}`);
   
   return playerStats;
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

