import select from 'select-dom';
import { getUserStats } from '../helpers/api-faceit';

export default parent = () => {
   const playerItems = select.all('.css-rc2id9');
   const enhancerStatsExists = select.exists(".enhancer-stats");

   if (!enhancerStatsExists) {
      playerItems.forEach(async (item) => {
         let statsElement = document.createElement('div');
         statsElement.classList.add("enhancer-stats");
         item.insertBefore(statsElement, item.children[1]);
         
         const steamUrl = select('.css-1su6yxb', item).href;
         const steamId = steamUrl.substr(steamUrl.lastIndexOf('/') + 1);
         const playerStats = await getUserStats(steamId);

         if (!playerStats) {
            statsElement.innerHTML = "Faceit account not found";
            return;
         }
         
         const imgUrl = chrome.runtime.getURL(`lvl-${playerStats['games']['csgo']['skill_level_label']}.png`);
         statsElement.innerHTML = `
         <div class="faceit-lvl"><img src="${imgUrl}"/>
         <p>${playerStats['games']['csgo']['faceit_elo']}</p></div>
         `;
      })
   }

}