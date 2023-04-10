const fs = require('fs');

class CartManager {
  constructor() {
    this.carts = [];
    this.filePath = 'carrito.json';
    this.init();
  }

  init() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (err) {
      fs.writeFileSync(this.filePath, JSON.stringify(this.carts));
    }
  }

  getAll() {
    return this.carts;
  }

  getById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  add(id, productos) {
    if (this.items.some((item) => item.id === id)) {
      throw new Error(`Ya existe un carrito con el id '${id}'.`);
    }

    const newCart = {
      id,
      productos,
    };

    this.items.push(newCart);
    this.save();
    return newCart;
  }

  /*addProductToCart(cartId, productId) {
    const cartIndex = this.carts.findIndex((cart) => cart.id === cartId);
    if (cartIndex === -1) return null;

    const productIndex = this.carts[cartIndex].products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex !== -1) return null;

    this.carts[cartIndex].products.push({ id: productId });
    this.save();
    return this.carts[cartIndex];
  }*/

  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.carts));
  }
}

module.exports = CartManager;

