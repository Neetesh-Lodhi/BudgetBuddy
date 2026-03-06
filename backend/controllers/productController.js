// controllers/productController.js

const Product = require("../models/Product");

//  Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, supplier } = req.body;

    // Basic validation
    if (!name || !category || !price || !quantity) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const newProduct = new Product({
      name,
      category,
      price,
      quantity,
      supplier,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};



//  Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};



//  Update Product
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,          // return updated document
        runValidators: true // apply schema validation
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(updatedProduct);

  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};


// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};




//  Search Products
exports.searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    if (!keyword) {
      return res.status(400).json({
        message: "Please provide search keyword",
      });
    }

    const products = await Product.find({
      name: { 
        $regex: keyword, 
        $options: "i"   // case-insensitive
      }
    });

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({
      message: "Error searching products",
      error: error.message,
    });
  }
};



//  Get Low Stock Products
exports.getLowStockProducts = async (req, res) => {
  try {
    const threshold = req.query.limit || 5; // default = 5

    const lowStockProducts = await Product.find({
      quantity: { $lt: threshold }
    });

    res.status(200).json(lowStockProducts);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching low stock products",
      error: error.message,
    });
  }
};




//  Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {

    const totalProducts = await Product.countDocuments();

    const totalQuantityData = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$quantity" },
          totalValue: { $sum: { $multiply: ["$price", "$quantity"] } }
        }
      }
    ]);

    const lowStockCount = await Product.countDocuments({
      quantity: { $lt: 5 }
    });

    res.status(200).json({
      totalProducts,
      totalQuantity: totalQuantityData[0]?.totalQuantity || 0,
      totalInventoryValue: totalQuantityData[0]?.totalValue || 0,
      lowStockCount
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching dashboard stats",
      error: error.message,
    });
  }
};
