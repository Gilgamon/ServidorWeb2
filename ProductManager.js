const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.filePath = 'productos.json';
    this.init();
    }

    init() {
    try {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    this.products = JSON.parse(data);
    } catch (err) {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products));
    }
  }

    getAll() {
    return this.products;
    }

    getByID(id) {
    return this.products.find((product) => product.id === id);
    }

    add(title, description, price, thumbnail, code, stock) {
    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(newProduct);
    this.save();
    return newProduct;
    }

    update(id, data) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) return null;
    const product = this.products[index];
    const updatedProduct = { ...product, ...data };
    this.products[index] = updatedProduct;
    this.save();
    return updatedProduct;
    }

    delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) return null;
    const deletedProduct = this.products[index];
    this.products.splice(index, 1);
    this.save();
    return deletedProduct;
    }

  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products));
  }
}

module.exports = { ProductManager };