const Product = require("../models/Product");
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");

// EXPORT CSV
exports.exportCSV = async (req, res) => {
  try {
    const products = await Product.find();

    const fields = ["name", "price", "quantity", "category"];
    const parser = new Parser({ fields });

    const csv = parser.parse(products);

    res.header("Content-Type", "text/csv");
    res.attachment("inventory_report.csv");

    return res.send(csv);
  } catch (error) {
    res.status(500).json({ message: "Error generating CSV" });
  }
};

// EXPORT PDF
exports.exportPDF = async (req, res) => {
  try {
    const products = await Product.find();

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=inventory_report.pdf",
    );

    doc.pipe(res);

    doc.fontSize(20).text("Inventory Report", { align: "center" });
    doc.moveDown();

    products.forEach((product) => {
      doc
        .fontSize(12)
        .text(`Name: ${product.name}`)
        .text(`Price: ${product.price}`)
        .text(`Quantity: ${product.quantity}`)
        .text(`Category: ${product.category}`)
        .moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Error generating PDF" });
  }
};
