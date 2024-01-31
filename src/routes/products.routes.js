import { Router } from "express";
import { ProductManager } from "../models/productManager.js";


const productManager = new ProductManager('./products.json')

const routerProd = Router()

routerProd.get('/', async (req, res) => {
    const { limit } = req.query
    const prods = await ProductManager.getProducts()
    const products = prods.slice(0, limit)
    res.status(200).send(products)
})

routerProd.get('/:id', async (req, res) => {
    const {id} = req.params
    const prod = await ProductManager.getProductsById(id)

    if (prod) {
        res.status(200).send(prod)
    } else{
        res.status(404).send("Producto no encontrado")
    }

})

routerProd.post('/', async (req, res) => {
    const conf = await productManager.addProduct(req.body)
    if (conf) {
        res.status(201).send("Producto creado")
    } else{
        res.status(400).send("Producto ya existente")
    }
})

routerProd.put('/:id', async (req, res) => {
    const { id } = req.params
    const conf = await productManager.updateProduct(id, req.body)

    if (conf) {
        res.status(200).send("Producto actualizado correctamente")
    } else{
        res.status(404).send("Producto no encontrado")
    }
})

routerProd.delete('/:id', async (req,res) => {
    const { id } = req.params
    const conf = await productManager.deleteProduct(id)

    if (conf) {
        res.status(200).send("Producto eliminado correctamente")
    } else{
        res.status(404).send("Producto no encontrado")
    }
})

export default routerProd