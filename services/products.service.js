const Products = require('../models/product.model');

class ProductService{

    save = async (doc) => {
        const result = await doc.save();
        return result;
    }

    create = async (doc) => {
        const newProductDoc = new Products(doc);
        const savedDoc = await this.save(newProductDoc);
        return savedDoc; 
    }

    findAll = async () => {
        const data = await Products.find({});
        return data;
      }

    delete = async (id) => {
        const docToDelete = await Products.findOneAndDelete({productId: id});
        if(docToDelete){
            return true
        } else {
            return false
        }
    }

    update = async (id, updatedItemData) => {
        const updatedItem = await Products.findOneAndUpdate(
            { productId: id },
            updatedItemData,
            { new: true } 
          );
          return updatedItem;
    }

}

module.exports = ProductService;