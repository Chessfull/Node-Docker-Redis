const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// ▼ Defining routes below -> endpoint, middleware(token in this scenario), controller
router.get('/', protect, productController.getProducts);
router.get('/:id', protect, productController.getProductById);
router.post('/', protect, productController.createProduct);
router.put('/:id', protect, productController.updateProduct);
router.delete('/:id', protect, productController.deleteProduct);

module.exports = router;
