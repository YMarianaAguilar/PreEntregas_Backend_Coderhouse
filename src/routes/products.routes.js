const express = require("express");
const { Router } = express;
const routerProd = new Router();

const ProductManager = require("../productManager.js");
const productManager = new ProductManager("./src/products.json"); 

routerProd.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit); 
    return res.json(products);
  } catch (error) {
    console.log(error);
    res.send("Error para obtener los productos");
  }
});

routerProd.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const products = await productManager.getProductById(pid);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.send("Error para obtener el producto por id");
  }
});

routerProd.post("/products", async (req, res) => {
  try {
    const { name, price, code, stock, description, thumbnail } = req.body; 
    const response = await productManager.addProduct({name,price,code,stock,description,thumbnail,});
    res.json(response);
  } catch (error) {
    console.log(error);
    res.send("Error para agregar productos");
  }
});

routerProd.put("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const { name, price, code, stock, description, thumpnail } = req.body;
    const response = await productManager.updateProduct(pid, {name,price,code,stock,description,thumpnail,});
    res.json(response);
  } catch (error) {
    console.log(error);
    res.send(`Error para editar productos por id ${pid}`);
  }
});

routerProd.delete("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    await productManager.deleteProduct(pid);
    res.send("Producto eliminado");
  } catch (error) {
    console.log(error);
    res.send(`Error para eliminar productos por id ${pid}`);
  }
});

module.exports = routerProd;