const router = require("express").Router();
const {postAddProduct, getAllProducts, deleteProduct, patchUpdateQuantity, updateItem} = require('../controllers/products.controller');

router.post('/products', postAddProduct);
router.get('/products', getAllProducts);
router.delete('/products/:id', deleteProduct);
router.patch('/products/updateQty/:id', patchUpdateQuantity);
router.put('/products/updateProduct/:id', updateItem);

module.exports = router;