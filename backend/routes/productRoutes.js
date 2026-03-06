const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
          searchProducts,
          getLowStockProducts,
   getDashboardStats,
} = require("../controllers/productController");

// router.post("/", createProduct);
router.get("/", getAllProducts);

// 🔥 Search route (IMPORTANT: put before /:id routes if you add them later)
router.get("/search", searchProducts);

// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

// router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// 🔥 Low stock route
router.get("/low-stock", getLowStockProducts);

router.get("/dashboard", getDashboardStats);




router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
