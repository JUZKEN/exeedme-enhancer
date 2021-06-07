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

export const isMatchRoomOverview = () => {
   let path = window.location.pathname.split('/')[1];
   return path == 'lobbies' ? true : false;
}

export const isProfileOverview = () => {
   let path = window.location.pathname.split('/')[1];
   return path == 'players' ? true : false;
}
