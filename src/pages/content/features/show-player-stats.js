import select from 'select-dom';
import { getUserInfo, getUserDetailedStats } from '../helpers/api-faceit';

export default parent = () => {
   const playerItems = select.all('.css-1qr7c6d');
   const enhancerStatsExists = select.exists(".enhancer-stats");

   if (!enhancerStatsExists) {
      playerItems.forEach(async (item) => {
         let statsElement = document.createElement('div');
         statsElement.classList.add("enhancer-stats");
         item.insertBefore(statsElement, item.children[1]);
         
         const steamUrl = select('.css-1kuebcl', item).href;
         const steamId = steamUrl.substr(steamUrl.lastIndexOf('/') + 1);
         const playerInfo = await getUserInfo(steamId);
         const playerDetailedStats = await getUserDetailedStats(steamId);

         if (!playerInfo || playerInfo['games'] == undefined || playerInfo['games']['csgo'] == undefined) {
            statsElement.innerHTML = "Faceit account not found";
            return;
         }
         
         const imgUrl = chrome.runtime.getURL(`lvl-${playerInfo['games']['csgo']['skill_level_label']}.png`);
         statsElement.innerHTML = `
         <a class="faceit-lvl" href="${playerInfo['faceit_url'].replace("{lang}", "en")}" target="_blank"><img src="${imgUrl}" />
         <p>${playerInfo['games']['csgo']['faceit_elo']} Elo | ${playerDetailedStats['lifetime']['Matches']} Matches</p></a>
         `;
      })
   }

}