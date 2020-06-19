export const cartController = () => {
  const main = document.querySelector(`.page-main`);
  const cartShopingList = document.querySelector(`.cart__shoping-list`);
  const productList = document.querySelector(`.headline-section__list`);
  const cartButton = document.querySelector(`.page-header__cart-img`);
  const cartContainer = document.querySelector(`.cart`);
  const cartCloseLink = document.querySelector(`.cart__link`);

  const ESC_KEY = 27;

  const setCartData = function(obj) {
    localStorage.setItem('cart', JSON.stringify(obj));
  };

  const getCartData = function(){
    return JSON.parse(localStorage.getItem('cart'));
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
  cartProducts = getCartData();

  productList.addEventListener("click", function (evt) {
    if (evt.target.tagName === `BUTTON`) {
      const productSection = evt.target.parentNode.parentNode;
      const productId = productSection.querySelector('.headline-section__button').getAttribute('data-id');
      const productTitle = productSection.querySelector('.headline-section__item-heading').innerHTML;
      const productPrice = productSection.querySelector('.headline-section__price-count').innerHTML;

      let cartProduct = {
        productId,
        productTitle,
        productPrice,
        productCount: 1
      };

      if (cartProducts.hasOwnProperty(productId)) {
        cartProducts[productId].productCount += 1;
      } else {
        cartProducts[productId] = cartProduct;
      }

      setCartData(cartProducts);
      console.log(getCartData());
    }
  });

  const renderCartProducts = () => {
    const cartMassiv = Object.values(cartProducts);
    cartMassiv.forEach((product) => {
      for (let i = 0; i < product.productCount; i++) {
        render(cartShopingList, createCartItem(product.productId,
           product.productTitle, product.productPrice), `beforeend`);
      }
    });

    console.log(cartProducts);
  };

  const clearTheCart = () => {
    let cartShopingItems = document.querySelectorAll(`.cart__shoping-item`);
    const cartItems = Array.prototype.slice.call(cartShopingItems);
    cartItems.forEach((item, i) => {
      item.remove();
    });
  };

  const onCartEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      cartContainer.classList.remove(`cart--on`);
      main.classList.remove(`page-main--faded`);
    }
  };

  const updateCorz = () => {
    clearTheCart();
    renderCartProducts();
    cartContainer.classList.add(`cart--on`);
    main.classList.add(`page-main--faded`);
    document.addEventListener(`keydown`, onCartEscPress);
  }

  const onCartClose = () => {
    if (cartContainer.classList.contains(`cart--on`)) {
      cartContainer.classList.remove(`cart--on`);
      main.classList.remove(`page-main--faded`);
      document.removeEventListener(`keydown`, onCartEscPress);
    } else {
      updateCorz();
    }
  };

  cartShopingList.addEventListener("click", function (evt) {
    if (evt.target.tagName === `BUTTON`) {
      const cartMassiv = Object.values(cartProducts);

      const productItemId = evt.target.getAttribute('data-id');

      cartMassiv.forEach((product) => {
        if (product.productId === productItemId) {
          product.productCount -= 1;
          setCartData(cartProducts);
        }
      });

      updateCorz();
      console.log(cartProducts);
    }
  });

  cartButton.addEventListener("click", onCartClose);
  cartCloseLink.addEventListener("click", onCartClose);
};
