import AbstractComponent from "./abstract-component.js";

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

export default class CartItemComponent extends AbstractComponent {
  constructor(id, name, price) {
    super();
    this.id = id;
    this.name = name;
    this.price = price;
  }

  getTemplate() {
    return createCartItem(this.id, this.name, this.price);
  }
}
