import Product from '../models/product.js';

export async function getAllProducts() {
  const allProducts = await Product.find();
  return allProducts;
}

export async function getProduct(prodId) {
  try {
    const product = await Product.findOne({ prodId: prodId });
    return product;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

//try-catch för POST PUT och DELETE menu
export async function addNewProduct(productData) {
  try { 
    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function updateProduct(prodId, productData) {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { prodId },
      productData,
      { new: true }
    );

    return updatedProduct;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function deleteProduct(prodId) {
  try {
    const deleted = await Product.findOneAndDelete({ prodId })
    return deleted;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}