const express = require("express");
const handlebars = require('express-handlebars');
const http = require('http')
const { Server } = require('socket.io')

const productsRoutes = require("./routes/products.routes.js");
const cartRoutes = require("./routes/cart.routes.js");

const ProductManager = require("./productManager");
const productManager = new ProductManager("./src/products.json");

const app = express();
const PORT = 8080 || process.env.PORT

const server = http.createServer(app)

app.use(express.static(__dirname + "/public"))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use(express.json());

app.use("/api", productsRoutes);
app.use("/api", cartRoutes);

app.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", {
        products
    });
});

app.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", {
        products
    });
});

// app.get("/", (req, res) => {
//     res.send("Mueblería Victor");
// });

const io = new Server(server)
io.on('connection', (socket) => {
    console.log('Nuevo Cliente ingresado')
    socket.on('new-product', async (newProduct) => {

        console.log('Producto nuevo para agregar', newProduct);
        await productManager.addProduct(newProduct);
        socket.emit('update-products', await productManager.getProducts());

    });
})

server.listen(PORT, () => {
    console.log("Server run on port 8080");
});


