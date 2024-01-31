import { Router } from "express";
import { ProductManager } from "../models/productManager.js";


const productManager = new ProductManager('./cart.json')

const routerCart = Router()

routerCart.get('/:cid', async (req,res) => {
    const {cid} = req.params
    const prod = await ProductManager.getProductsById(cid)

    if (prod) {
        res.status(200).send(prod)
    } else{
        res.status(404).send("Producto no encontrado")
    }
})

routerCart.post('/:cid', async (req,res) => {
    const {cid} = req.params
    const conf = await productManager.updateProduct(cid, req.body)

    if (conf) {
        res.status(200).send("Producto agregado")
    } else{
        res.status(404).send("Producto no encontrado")
    }
})

routerCart.delete('/:cid', async (req,res) => {
    const {cid} = req.params
    const conf = await productManager.deleteProduct(cid)

    if (conf) {
        res.status(200).send("Producto eliminado correctamente")
    } else{
        res.status(404).send("Producto no encontrado")
    }
})

export default routerCart