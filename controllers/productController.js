const Product = require("../models/Product");
const redisClient = require("../config/redisClient");

const CACHE_EXPIRATION = 3600; // -> 3600 ms - 1 hour

// ▼ Get all products with Redis caching ▼
exports.getProducts = async (req, res) => {
  try {
    const cacheKey = "products"; // -> Defining cachekey for redis cache
    const cachedData = await redisClient.get(cacheKey); // -> Find if exist

    if (cachedData) {
      // -> If find getting data from there more speed than traditional database approaches, working on in-memory not disk
      console.log("Cache hit");
      return res.status(200).json(JSON.parse(cachedData));
    }

    console.log("Cache miss"); // -> If not redis cache find and later save to redis cache
    const products = await Product.find();
    await redisClient.setEx(
      cacheKey,
      CACHE_EXPIRATION, // -> This is expiration I defined above as variable
      JSON.stringify(products)
    );

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ▼ Get a product by ID with Redis caching if exist ▼
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const cacheKey = `product:${productId}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json(JSON.parse(cachedData));
    }

    // -> If not exist savign redis cache
    console.log("Cache miss");
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await redisClient.setEx(
      cacheKey,
      CACHE_EXPIRATION,
      JSON.stringify(product)
    );

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ▼ Create a product ▼
exports.createProduct = async (req, res) => {
  try {
    // ▼ Saving product database from body ▼
    const product = new Product(req.body);
    const savedProduct = await product.save();
    // ▼ !!! For rendering all products after new product added delete ex outdated caching data !!! ▼
    try {
      await redisClient.del("products");
      console.log("'products' key deleted along create product processes ...");
    } catch (cacheError) {
      console.error(
        "Failed to delete cache along create product processes ...:",
        cacheError
      );
    }

    res.status(201).json(savedProduct);
  } catch (err) {
    // -> This is saving product database catch
    res.status(500).json({ message: err.message });
  }
};

// ▼ Update a product ▼
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // -> This is for returning updated product, option
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    // ▼ Redis  set caching ▼
    const cacheKey = `product:${req.params.id}`;
    await redisClient.setEx(
      cacheKey,
      CACHE_EXPIRATION,
      JSON.stringify(updatedProduct)
    );

    // ▼ !!! For rendering all products after new product added delete ex outdated caching data !!! ▼
    try {
      await redisClient.del("products");
      console.log("'products' key deleted along create product processes ...");
    } catch (cacheError) {
      console.error(
        "Failed to delete cache along create product processes ...:",
        cacheError
      );
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    // -> This catch for updating product
    res.status(500).json({ message: err.message });
  }
};

// ▼ Delete a product ▼
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    const cacheKey = `product:${req.params.id}`;
    await redisClient.del(cacheKey);
   
    // ▼ !!! For rendering all products after product changes, delete in this scenario, delete ex outdated caching data !!! ▼
    try {
      await redisClient.del("products");
      console.log("'products' key deleted along create product processes ...");
    } catch (cacheError) {
      console.error(
        "Failed to delete cache along create product processes ...:",
        cacheError
      );
    }

    res.status(200).json({ message: "Product deleted successfully ..." });
  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
