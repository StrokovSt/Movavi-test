import {timerController} from "./controllers/timer.js";
import {cartController} from "./controllers/cart.js";

timerController();

const main = document.querySelector(`.page-main`);
const button = document.querySelector(`.page-header__toggle`);
const headerNavigation = document.querySelector(`.page-header__list`);

const cartContainer = document.querySelector(`.cart`);

button.addEventListener("click", function () {
  if (headerNavigation.classList.contains(`page-header__list--opened`)) {
    headerNavigation.classList.remove(`page-header__list--opened`);
  } else {
    headerNavigation.classList.add(`page-header__list--opened`);
  }
});

cartController();
