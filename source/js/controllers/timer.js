export const timerController = () => {
  const offerItem = document.querySelector(`.headline-section__item--offer`);
  const offerItemNotice = offerItem.querySelector(`.headline-section__notice`);

  const setCartData = function(obj) {
    localStorage.setItem('timer', JSON.stringify(obj));
  };

  const getCartData = function(){
    return JSON.parse(localStorage.getItem('timer'));
  }

  let counter = 0;

  if (getCartData() === null) {
    counter = 0;
    setCartData(counter);
  } else {
    counter = getCartData();
    console.log(`Сеанс был прерван на шаге: ` + counter);
  }

  // Обновляет таймер каждую секунду, пока не пройдёт 15 минут.

  const counterInterval = 90;

  const intervalId = setInterval(() => {
    counter += 1;
    setCartData(counter);
    offerItemNotice.innerHTML = `offer will be available for another ${(counterInterval - counter) * 1} seconds`;
    console.log(`Сейчас шаг номер: ` + counter);
  if (counter >= counterInterval) {
      clearInterval(intervalId);
      localStorage.removeItem('timer');
      offerItem.classList.remove(`headline-section__item--offer`);
    }
  }, 1000);
};
