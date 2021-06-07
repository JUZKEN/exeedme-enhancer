import select from 'select-dom';
import { getUserInfo } from '../helpers/api-faceit';

export default parent = async () => {
   let socialWrapper = select(".css-84zodg")
   if (socialWrapper && !socialWrapper.classList.contains("enhancer-loaded")) {
      socialWrapper.classList.add("enhancer-loaded");
      const steamButton = select('.css-1kuebcl', socialWrapper);
      const steamUrl = steamButton.href;
      const steamId = steamUrl.substr(steamUrl.lastIndexOf('/') + 1);

      let playerInfo = await getUserInfo(steamId);

      if (!playerInfo || playerInfo['games'] == undefined) {
         return;
      }

      let faceitUrl = playerInfo['faceit_url'].replace("{lang}", "en");

      let faceitButton = steamButton.cloneNode(true);
      faceitButton.classList.add("enhancer-faceit-button");
      faceitButton.href = faceitUrl;

      let icon = document.createElement("IMG");
      icon.src = chrome.runtime.getURL(`faceit_icon.png`);

      select('svg', faceitButton).remove();
      select('button', faceitButton).appendChild(icon)

      socialWrapper.appendChild(faceitButton)
   }
}
