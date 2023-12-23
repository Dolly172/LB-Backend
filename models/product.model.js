const mongoose = require("mongoose");
// const validator =  require('validator');

const producsSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
},
{
    timestamps: true
})

const productModel = mongoose.model("Products", producsSchema);

module.exports = productModel;