const fs = require("fs");
const { json } = require("express");
const uuid4 = require("uuid4");

class CartManager {

    constructor(path) {
        this.path = path;
        this.carts = [];
    }
    getCarts = async () => {

        const response = await fs.promises.readFile(this.path, "utf-8");
        const responseJSON = JSON.parse(response);
        return responseJSON;
    };
    getCartProducts = async (id) => {

        const carts = await this.getCarts();
        const cart = carts.find((cart) => cart.id === id);

        if (cart) {
            return cart.products;
        } else {
            console.log("Carrito vacío");
        }
    };

    newCart = async () => {
        const id = uuid4();
        const newCart = { id, products: [] };

        this.carts = await this.getCarts();
        this.carts.push(newCart);

        await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        return newCart;
    };

    addProductCart = async (cart_id, product_id) => {

        const carts = await this.getCarts();
        const index = carts.findIndex((cart) => cart.id == cart.id);

        if (index !== -1) {
            const cartProducts = await this.getCartProducts(cart_id);

            const existingProductIndex = cartProducts.findIndex(
                (product) => product.id == product_id   // product.id debe ser usado.
            );

            if (existingProductIndex !== -1) {
                cartProducts[existingProductIndex].quantity =
                    cartProducts[existingProductIndex].quantity + 1;
            } else {
                cartProducts.push({ product_id, quantity: 1 });
            }
            carts[index].products = cartProducts;

            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            console.log("El producto fue agregado");
        } else {
            console.log("Carrito no encontrado");
        }
    };
}

module.exports = CartManager;