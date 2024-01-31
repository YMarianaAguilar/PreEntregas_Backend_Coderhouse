import {promises as fs} from 'fs' //fs.promises
import crypto from 'crypto'

//crypto.randomBytes(16).toString('hex') //igual a .math para ids únicos

export class ProductManager {

    constructor(path) {
        this.products = []
        this.path = path
    }

    async getProducts() {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return prods
    }

    async getProductById(id) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = prods.find(producto => producto.code === code)
        return prod
    }

    async addProduct(prod) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const existProd = prods.find(producto => producto.id === prod.id)
        if (existProd) {
            return false

        } else{

            prod.id = crypto.randomBytes(16).toString('hex')
            prods.push(prod)
            await fs.writeFile(this.path, JSON.stringify(prods))
            return true
        }

    }

    async updateProduct(id, prod) {
    const prods = JSON(await fs.readFile(this.path, 'utf-8'))
    const prod = prods.find(producto => producto.id === id)
    if (prod) {
        prod.title = producto.title
        prod.description = producto.description
        prod.price = producto.price
        prod.stock = producto.stock
        prod.status = producto.status
        prod.category = producto.category
        prod.thumbnail = producto.thumbnail
        prod.code = producto.code
        prods.push(prod)
        await fs.writeFile(this.path, JSON.stringify(prods))
        return true

    } else{

        return false
    }
 
    }

    async deleteProduct(id) {
        const prods = JSON(await fs.readFile(this.path, 'utf-8'))
        const prod = prods.find(producto => producto.id === id)

        if (prod) {
            prods.filter(producto => producto.id !== id)
            await fs.writeFile(this.path, JSON.stringify)
            return true
        } else{
            return false
        }
    }

}

