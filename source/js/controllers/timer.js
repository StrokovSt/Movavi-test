export const timerController = () => {
  const main = document.querySelector(`.page-main`);
  const offerItem = document.querySelector(`.headline-section__item--offer`);
  const offerItemNotice = offerItem.querySelector(`.headline-section__notice`);

  const ESC_KEY = 27;

  const setCartData = (obj) => {
    localStorage.setItem(`timer`, JSON.stringify(obj));
  };

  const getCartData = () => {
    return JSON.parse(localStorage.getItem(`timer`));
  };

  const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
  };

  const createPopup = () => {
    return (
      `<div class="result-popup">
        <button class="result-popup__close-button" type="button">
          <span class="visually-hidden">закрыть окно</span>
        </button>
        <h2 class="result-popup__heading">Срок акции истёк</h2>
        <p class="result-popup__message">Приносим свои извинения, но акция завершилась.</p>
        <button class="result-popup__button button">Понятно</button>
      </div>`
    );
  };

  const onPopupEscPress = (evt) => {
    if (evt.keyCode === ESC_KEY) {
      const popup = document.querySelector(`.result-popup`);
      popup.remove();
    }
  };

  const renderPopup = () => {
    render(main, createPopup(), `beforeend`);
    const popup = document.querySelector(`.result-popup`);
    const popupCloseButton = document.querySelector(`.result-popup__button`);
    popupCloseButton.addEventListener(`click`, function () {
      popup.remove();
    });
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  let counter = 0;

  if (getCartData() === null) {
    counter = 0;
    setCartData(counter);
  } else {
    counter = getCartData();
  }

  // Обновляет таймер каждую секунду, пока не пройдёт 15 минут.

  const counterInterval = 900;

  const intervalId = setInterval(() => {
    counter += 1;
    setCartData(counter);
    offerItemNotice.innerHTML = `offer will be available for another ${(counterInterval - counter) * 1} seconds`;
    if (counter >= counterInterval) {
      clearInterval(intervalId);
      localStorage.removeItem(`timer`);
      offerItem.classList.remove(`headline-section__item--offer`);
      renderPopup();
    }
  }, 1000);
};
