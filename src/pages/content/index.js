import select from 'select-dom';
import { runIfFeatureEnabled } from './helpers/feature_settings';
import * as run_conditions from './helpers/run_conditions';
import clickAcceptButton from './features/click-accept-button';
import showPlayerStats from './features/show-player-stats';
import showPlayerElo from './features/show-player-elo';

console.log('Content script injected!');

function observe() {
   const observer = new MutationObserver( (mutations) => {
   
      if (run_conditions.isMatchRoomOverview()) {
         runIfFeatureEnabled(
            'showPlayerStatsEnabled',
            showPlayerStats
         )
         runIfFeatureEnabled(
            'showPlayerStatsEnabled',
            showPlayerElo
         )
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
