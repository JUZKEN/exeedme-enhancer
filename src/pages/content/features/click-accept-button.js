import select from 'select-dom';

export default parent = (modalElement) => {
   const acceptButton = select("button", modalElement);
   if (acceptButton) acceptButton.click();
}