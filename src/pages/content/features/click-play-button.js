import select from 'select-dom';

export default parent = () => {
   const playButton = select(".css-ycgbwp");
   
   if (playButton && !playButton.classList.contains("enhancer-clicked")) {
      playButton.classList.add("enhancer-clicked");
      playButton.click()
   };
}