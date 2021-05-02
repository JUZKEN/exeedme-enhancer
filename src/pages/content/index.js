import select from 'select-dom';
import { runIfFeatureEnabled } from './helpers/feature_settings';
import clickAcceptButton from './features/click-accept-button';
import showPlayerStats from './features/show-player-stats';
import * as run_conditions from './helpers/run_conditions';
import { getUserStats } from './helpers/api-faceit';

console.log('Content script injected!');

function observe() {
   const pathName = window.location.pathname;
   const firstUrlSegment = pathName.split('/')[1];
   const observer = new MutationObserver( (mutations) => {
   
      if (firstUrlSegment == 'lobbies') {
         if (run_conditions.isMatchRoomOverview()) {
            runIfFeatureEnabled(
               'showPlayerStatsEnabled',
               showPlayerStats
            )
         }
      }

      const modalElement = select('.chakra-modal__content');
      if (modalElement) {
         if (run_conditions.isMatchReady(modalElement)) {
            runIfFeatureEnabled(
               'autoAccept',
               clickAcceptButton,
               modalElement
            )
         }
      }

   });

   observer.observe(document.body, { childList: true, subtree: true });
}

(async () => {

   

   observe();
})()
