import { Router } from 'express';
import { addNewProduct, getAllProducts, updateProduct } from '../services/products.js';
import { authenticate, authorizeRole } from '../middlewares/authenticate.js';

const router = Router();

// GET all products
router.get('/', async (req, res, next) => {
  const result = await getAllProducts();

  if (result) {
    res.json({
      success: true,
      products: result,
    });
  } else {
    next({
      status: 404,
      message: 'No products found',
    });
  }
});

//POST add new product
router.post('/', authenticate, authorizeRole('admin'), async (req, res, next) => {
  const result = await addNewProduct(req.body);

  if (result) {
    res.json({
      success: true,
      product: result,
    });
  } else {
    next({
      status: 400,
      message: 'Could not add new product',
    });
  }
})

//PUT update product
router.put('/:prodId', authenticate, authorizeRole('admin'), async (req, res, next) => {
  const { prodId } = req.params;
  const productData = req.body;

  const result = await updateProduct(prodId, productData);

  if (result) {
    res.json({
      success: true,
      product: result,
    });
  } else {
    next({
      status: 400,
      message: 'Could not update product',
    });
  }
})

//DELETE product

export default router;