const express = require('express');

const app = express();

const { ProductManager } = require('./ProductManager.JS')

const products = new ProductManager

app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit) || products.getAll().length;
  const allProducts = products.getAll().slice(0, limit);
  res.json(allProducts);
});
// Endpoint para agregar un nuevo producto
app.post('/products', (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  if (!title || !description || !price || !thumbnail || !code || !stock) {
    res.status(400).json({ error: 'Imposible Agregar' });
  } else {
    const newProduct = products.add(title, description, price, thumbnail, code, stock);
    res.json(newProduct);
  }})
// Endpoint para obtener un producto por su ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.getByID(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }});
// Endpoint para actualizar un producto por su ID
app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.getByID(productId);
  if (product) {
    const updatedProduct = products.update(productId, req.body);
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }});

// Endpoint para eliminar un producto por su ID
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.delete(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }});
  const CartManager = require('./CartManager.JS');
  
  const cartManager = new CartManager();

// GET 
app.get('/carts', (req, res) => {
  const carts = cartManager.getAll();
  res.json(carts);
});

// GET /carts/:id
app.get('/carts/:id', (req, res) => {
  const cart = cartManager.getById(parseInt(req.params.id));
  if (!cart) {
    res.sendStatus(404);
  } else {
    res.json(cart);
  }
});

// Ruta para agregar carritos
app.post('/carts', (req, res) => {
  const id = req.body.id;
  const productos = req.body.productos;

  try {
    const newCart = cart.add(id, productos);
    res.status(201).json(newCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// POST /carts/:cid/products/:pid
app.post('/carts/:cid/products/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  const cart = cartManager.addProductToCart(cartId, productId);
  if (!cart) {
    res.sendStatus(404);
  } else {
    res.json(cart);
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
