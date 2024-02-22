const express = require("express");
const uuid4 = require("uuid4");

const { Router } = express;
const routerProd = new Router();

const CartManager = require("../cartManager");
const cartManager = new CartManager("./src/cart.json");

routerProd.get("/cart/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const response = await cartManager.getCartProducts(cid);
        res.json(response);
    } catch (error) {
        res.send("Error para enviar los productos");
    }
});

routerProd.post("/cart", async (req, res) => {
    try {
        const response = await cartManager.newCart();
        return res.json(response);
    } catch (error) {
        console.log(error);
        res.send("Error para crear el carrito");
    }
});

routerProd.post("/cart/:cid/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await cartManager.addProductCart(cid, pid);
        res.send("Producto agregado");
    } catch (error) {
        res.send("Error para guardar el producto");
    }
});

module.exports = routerProd;