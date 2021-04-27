import select from 'select-dom';

export const isMatchReady = element => {
   const buttons = select.all("button");
   for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].textContent == "Accept Match") {
         return true;
      }
   }
   return false;
}
