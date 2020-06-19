export const cartController = () => {
  const main = document.querySelector(`.page-main`);
  const productList = document.querySelector(`.headline-section__list`);
  const cartButton = document.querySelector(`.page-header__cart-img`);
  const cartContainer = document.querySelector(`.cart`);
  const cartCloseLink = document.querySelector(`.cart__link`);

  const setCartData = function(obj) {
    localStorage.setItem('cart', JSON.stringify(obj));
  };

  const getCartData = function(){
    return JSON.parse(localStorage.getItem('cart'));
  };

  const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
  };


  const cartShopingList = document.querySelector(`.cart__shoping-list`);

  const cartProducts = {};

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

      console.log(cartProducts);

      // const cartProductComponent = new CartItemComponent(productId, productTitle, productPrice);
      // console.log(cartProductComponent.getElement());
      // render(cartShopingList, cartProductComponent.getElement(), `beforeend`);

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

      render(cartShopingList, createCartItem(cartProduct.productId,
        cartProduct.productTitle, cartProduct.productPrice), `beforeend`);

    }
  });

  const onCartClose = () => {
    if (cartContainer.classList.contains(`cart--on`)) {
      cartContainer.classList.remove(`cart--on`);
      main.classList.remove(`page-main--faded`);
    } else {
      cartContainer.classList.add(`cart--on`);
      main.classList.add(`page-main--faded`);
    }
  };

  cartShopingList.addEventListener("click", function (evt) {
    if (evt.target.tagName === `BUTTON`) {
      const productItem = evt.target.parentNode.parentNode;
      console.log(productItem);
      productItem.remove();
    }
  });

  cartButton.addEventListener("click", onCartClose);
  cartCloseLink.addEventListener("click", onCartClose);
};
