export const cartController = () => {
  const main = document.querySelector(`.page-main`);
  const productList = document.querySelector(`.headline-section__list`);
  const cartButton = document.querySelector(`.page-header__cart-img`);
  const cartContainer = document.querySelector(`.cart`);
  const cartShopingList = cartContainer.querySelector(`.cart__shoping-list`);
  const cartCloseButton = document.querySelector(`.cart__link`);
  const cartCloseAllButton = cartContainer.querySelector(`.cart__delete-all-button`);
  const cartTotalPrice = cartContainer.querySelector(`.cart__resume-span--price`);

  const ESC_KEY = 27;

  const setCartData = (obj) => {
    localStorage.setItem(`cart`, JSON.stringify(obj));
  };

  const getCartData = () => {
    return JSON.parse(localStorage.getItem(`cart`));
  };

  const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
  };

  const createCartItem = (id, name, price) => {
    return (
      `<li class="cart__shoping-item">
        <img class="cart__shoping-img" src="img/stikers-pack.png" width="134" height="75" alt="Такой то товар">
        <div class="cart__info-container">
          <p class="cart__shoping-description">${name}</p>
          <span class="cart__shoping-price">${price} руб</span>
          <button class="cart__delete-button" type="button" data-id="${id}">Delete</button>
        </div>
      </li>`
    );
  };

  let cartProducts = {};
  if (getCartData() !== null) {
    cartProducts = getCartData();
  }

  productList.addEventListener(`click`, function (evt) {
    if (evt.target.tagName === `BUTTON`) {
      const productSection = evt.target.parentNode.parentNode;
      const productId = productSection.querySelector(`.headline-section__button`).getAttribute(`data-id`);
      const productTitle = productSection.querySelector(`.headline-section__item-heading`).innerHTML;
      const productPrice = Number(productSection.querySelector(`.headline-section__price-count`).innerHTML);
      const offerProductPrice = Number(productSection.querySelector(`.headline-section__price-count--current`).innerHTML);

      let cartProduct = {
        productId,
        productTitle,
        productPrice,
        offerProductPrice,
        productCount: 1
      };

      if (cartProducts.hasOwnProperty(productId)) {
        cartProducts[productId].productCount += 1;
      } else {
        cartProducts[productId] = cartProduct;
      }

      setCartData(cartProducts);
    }
  });


  const renderCartProducts = () => {
    const cartMassiv = Object.values(cartProducts);
    const cartItems = Array.prototype.slice.call(productList.querySelectorAll(`.headline-section__item`));
    let price = 0;
    cartMassiv.forEach((product, i) => {
      if (cartItems[i].classList.contains(`headline-section__item--offer`)) {
        price = product.offerProductPrice;
      } else {
        price = product.productPrice;
      }
      for (let j = 0; j < product.productCount; j++) {
        render(cartShopingList, createCartItem(product.productId, product.productTitle, price), `beforeend`);
      }
    });
  };

  const clearTheCart = () => {
    let cartShopingItems = document.querySelectorAll(`.cart__shoping-item`);
    const cartItems = Array.prototype.slice.call(cartShopingItems);
    cartItems.forEach((item) => {
      item.remove();
    });
  };

  const updatePrices = () => {
    const cartMassiv = Object.values(cartProducts);
    const cartItems = Array.prototype.slice.call(productList.querySelectorAll(`.headline-section__item`));
    let totalPrice = 0;
    let price = 0;
    cartMassiv.forEach((item, i) => {
      if (cartItems[i].classList.contains(`headline-section__item--offer`)) {
        price = item.offerProductPrice;
      } else {
        price = item.productPrice;
      }
      for (let j = 0; j < item.productCount; j++) {
        totalPrice = totalPrice + price;
      }
    });
    cartTotalPrice.innerHTML = totalPrice + ` руб.`;
  };

  const updateCart = () => {
    clearTheCart();
    renderCartProducts();
    updatePrices();
    cartContainer.classList.add(`cart--on`);
    main.classList.add(`page-main--faded`);
    document.addEventListener(`keydown`, onCartEscPress);
  };

  const removeAllProducts = () => {
    cartProducts = {};
    clearTheCart();
    localStorage.removeItem(`cart`);
    updatePrices();
  };

  const onCartEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      cartContainer.classList.remove(`cart--on`);
      main.classList.remove(`page-main--faded`);
    }
  };

  const onCartClose = () => {
    if (cartContainer.classList.contains(`cart--on`)) {
      cartContainer.classList.remove(`cart--on`);
      main.classList.remove(`page-main--faded`);
      document.removeEventListener(`keydown`, onCartEscPress);
    } else {
      updateCart();
    }
  };

  cartShopingList.addEventListener(`click`, function (evt) {
    if (evt.target.tagName === `BUTTON`) {
      const cartMassiv = Object.values(cartProducts);

      const productItemId = evt.target.getAttribute(`data-id`);

      cartMassiv.forEach((product) => {
        if (product.productId === productItemId) {
          product.productCount -= 1;
          setCartData(cartProducts);
        }
      });

      updateCart();
    }
  });

  cartButton.addEventListener(`click`, onCartClose);
  cartCloseButton.addEventListener(`click`, onCartClose);
  cartCloseAllButton.addEventListener(`click`, removeAllProducts);
};
