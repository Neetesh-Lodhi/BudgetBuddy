const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  const text = message.toLowerCase();

  try {

    const products = await Product.find();

    // total products
    if (text.includes("total products") || text.includes("how many products")) {
      return res.json({
        reply: `You currently have ${products.length} products in inventory.`
      });
    }

    // low stock
    if (text.includes("low stock")) {
      const lowStock = products.filter(p => p.quantity < 5);

      if (lowStock.length === 0) {
        return res.json({ reply: "No products are low in stock." });
      }

      const names = lowStock.map(p => p.name).join(", ");

      return res.json({
        reply: `These products are low in stock: ${names}`
      });
    }

    // categories
    if (text.includes("categories")) {
      const categories = [...new Set(products.map(p => p.category))];

      return res.json({
        reply: `You have ${categories.length} categories: ${categories.join(", ")}`
      });
    }

    // most products category
    if (text.includes("most products")) {

      const categoryCount = {};

      products.forEach(p => {
        categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
      });

      let maxCategory = "";
      let maxCount = 0;

      for (let cat in categoryCount) {
        if (categoryCount[cat] > maxCount) {
          maxCount = categoryCount[cat];
          maxCategory = cat;
        }
      }

      return res.json({
        reply: `The category with most products is ${maxCategory} (${maxCount} items).`
      });
    }

    return res.json({
      reply: "Sorry, I didn't understand. Try asking about products, stock, or categories."
    });

  } catch (error) {
    res.status(500).json({ reply: "Server error" });
  }
});

module.exports = router;