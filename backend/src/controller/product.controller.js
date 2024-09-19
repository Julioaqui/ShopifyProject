const express = require("express");
const Product = require("../model/product.model");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { title, price, image, description, gender, quantity } = req.body;

  try {
    await Product.create({ title, price, image, description, gender, quantity })
    return res.status(200).json({ status: true, message: "Product created suaccessfully" });
  } catch (error) {
    console.log("Creation error: ", error.message);
    return res.status(500).json({ status: false, message: "Something went wrong, product not created" })
  }
}
)

router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(201).json({ status: true, data: products })
  }
  catch (error) {
    console.log('error', error.message);
    return res.status(500).json({ status: false, message: 'Something went wrong.' })
  }
})

router.get("/totalPrice", async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        '$group': {
          '_id': '$description',
          'totalSum': {
            '$sum': '$price'
          },
          'inventory': {
            '$sum': '$quantity'
          }
        }
      }, {
        '$project': {
          'category': '$_id',
          '_id': 0,
          'totalSum': 1,
          'inventory': 1
        }
      }
    ]);

    return res.status(201).json({ status: true, data: products })
  }
  catch (error) {
    console.log('error', error.message);
    return res.status(500).json({ status: false, message: 'Something went wrong.' })
  }
})

router.get("/singleProduct/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id", id)
  try {
    const products = await Product.find({ _id: id});

    return res.status(201).json({ status: true, data: products })
  }
  catch (error) {
    console.log('error', error.message);
    return res.status(500).json({ status: false, message: 'Something went wrong.' })
  }
})

module.exports = router
