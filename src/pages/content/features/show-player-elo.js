import select from 'select-dom';
import { getPlayersEloInLobby } from '../helpers/api-exeedme';

export default parent = async () => {
   const lobbyWrapper = select('.css-8am8ru');
   const playerItems = select.all('.css-1qr7c6d');

   if (lobbyWrapper && !lobbyWrapper.classList.contains("enhancer-elo-loaded")) {
      lobbyWrapper.classList.add("enhancer-elo-loaded");
      const lobbyId = window.location.pathname.split('/')[2];

      let eloRatings = await getPlayersEloInLobby(lobbyId);
      playerItems.forEach(item => {
         let levelBadge = select('.css-1a6ryd7', item);
         let playerId = select('a', item).href.split('/')[4];

         let playerRatings = eloRatings.filter(obj => {
            return obj['playerId'] == playerId
         })

         let statsElement = document.createElement('div');
         statsElement.classList.add("enhancer-elo");
         levelBadge.parentNode.insertBefore(statsElement, levelBadge.parentNode.children[1]);
   
         statsElement.innerHTML = playerRatings[0]['elo'];
      })
   }
}
