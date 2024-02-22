const express = require("express");

const productsRoutes = require("./routes/products.routes.js");
const cartRoutes = require("./routes/cart.routes.js");

const app = express();

app.use(express.json());

app.use("/api", productsRoutes);
app.use("/api", cartRoutes);

app.get("/", (req, res) => {
    res.send("Mueblería Victor");
});

app.listen(8080, () => {
    console.log("Server run on port 8080");
});

