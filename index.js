require("dotenv").config();
const express = require("express");

const Products = require('./models/product.model');

const productRoutes = require('./routes/products.routes');

const DB_URI = process.env.DB_URI;

const mongoose = require("mongoose");

mongoose
.connect(`${DB_URI}`)
.then(() => console.log("Connected to DB at ", DB_URI))
.catch(() => console.log("Failed to connect to DB at ", DB_URI));

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json()); 
app.use(cors());

app.use('/', productRoutes);


app.listen(PORT, () => {
    console.log("Listening on", PORT);
})