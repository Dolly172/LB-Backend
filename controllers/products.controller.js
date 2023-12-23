const { request, response } = require("express");
const Products = require('../models/product.model');
const ProductService = require('../services/products.service');
const ProductServiceInstance = new ProductService();

const postAddProduct = async (request, response) => {
    try{
        const body = request.body;
        await ProductServiceInstance.create(body);
        response.sendStatus(200);
      
    } catch(error){
        console.log(error);
        response.status(500).json(error);
    }
};

const getAllProducts = async (request, response) => {
    try{
        const data = await ProductServiceInstance.findAll();
        response.status(200).json(data);
    } catch(error){
        console.log(error);
        response.status(500).json(error);
    }
}

const deleteProduct = async (request, response) => {
    try{
      const {id} = request.params;
      const data = await ProductServiceInstance.delete(id);
      if(data){
        response.sendStatus(200)
      } else {
        response.status(200).json({"Error": "Product not found"})
      }
    } catch(error){
      console.log(error);
      response.status(500).json(error);
    }
}

const patchUpdateQuantity = async (request, response) => {
    try{
      const {id} = request.params;
      const {action} = request.body;
      let updateCondition = { productId: parseInt(id) };
      let updateOperation;

      const existingProduct = await Products.findOne({ productId: parseInt(id) });

      if (!existingProduct) {
        return response.status(404).json({ error: 'Product not found.' });
      }

      if (action === 'inc') {
        updateOperation = { $inc: { quantity: 1 } };
      } else if (action === 'dec' && existingProduct.quantity > 0) {
        updateOperation = { $inc: { quantity: -1 } };
      } else {
        return response.status(400).json({ error: 'Invalid action or quantity.' });
      }
      const data = await Products.updateOne(updateCondition, updateOperation);

      if (data.modifiedCount === 0) {
        return response.status(400).json({ error: 'Cannot update quantity.' });
      }
  
      response.status(200).json(data);
    } catch (error){
      console.log(error);
      response.status(500).json(error);
    }
}

const updateItem = async (request, response) => {
  try{
    const {id} = request.params;
    const updatedItemData = request.body;

    const updatedData = await ProductServiceInstance.update(id, updatedItemData);

    if (!updatedData) {
      return response.status(404).json({ error: 'Item not found' });
    }
    response.json(updatedData);

  }catch(error){
    console.log(error);
    response.status(500).json(error);
  }
}

module.exports = {postAddProduct, getAllProducts, deleteProduct, patchUpdateQuantity, updateItem};