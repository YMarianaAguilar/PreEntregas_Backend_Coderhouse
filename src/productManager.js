const fs = require("fs");
const uuid4 = require("uuid4");

class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    saveToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    async loadFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, "utf8");
            return JSON.parse(data);
        } catch (error) {
            console.error("Error", error);
        }
    }

    async getProducts(limit) {
        const products = await this.loadFromFile();
        if (limit) {
            return products.slice(0, limit);
        } else {
            return products;
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find((product) => product.id === id);
        if (!product) {
            return "No Encontrado";
        }
        return product;
    }

    async addProduct({ name, price, code, stock, description, thumbnail }) {
        if (!name || !price || !code || !stock || !description || !thumbnail) {
            console.log("Valida todos los campos");
        }
        this.products = await this.getProducts();
        if (!this.products.some((p) => p.code === code)) {
            const newProduct = { name, price, code, stock, description, thumbnail, id: uuid4(), };
            this.products.push(newProduct);
            this.saveToFile();
            console.log(`El producto ${name} se agregó correctamente`);
        } else {
            console.log(`El producto con el codigo ${code} ya existe`);
        }
    }

    async updateProduct(id, updatedFields) {
        let products = await this.getProducts();
        const productIndex = products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            console.log("No encontrado");
            return;
        }

        if ("id" in updatedFields) {
            console.log("El ID no se puede cambiar");
            return;
        }
        products[productIndex] = { ...products[productIndex], ...updatedFields };
        this.products = products;
        this.saveToFile();
        return products[productIndex];
    }

    async deleteProduct(id) {
        this.products = await this.getProducts();
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            console.error(`No encontrado`);
            return;
        }
        this.products.splice(index, 1);
        this.saveToFile();
        console.log(`El producto fue eliminado`);
    }
    
}

module.exports = ProductManager;

