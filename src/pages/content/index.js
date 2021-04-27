import select from 'select-dom';
import { runIfFeatureEnabled } from './helpers/feature_settings';
import clickAcceptButton from './features/click-accept-button';
import * as modals from './helpers/modals';

console.log('Content script injected!');

function observe() {
   const observer = new MutationObserver((mutations) => {
      const modalElement = select('.chakra-modal__content');
      if (modalElement) {

         if (modals.isMatchReady(modalElement)) {
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
