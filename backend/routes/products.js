const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')

// Middleware to check if the user is an admin (for demo purposes)
const adminOnly = (req, res, next) => {
  const isAdmin = req.headers['admin'] === 'true' // 'admin' header should be 'true'
  if (!isAdmin) {
    return res.status(403).send('Admin access required')
  }
  next()
}

// Get All products
router.get('/', async (req, res) => {
  // res.send("Welcome to Products Page");
  const allProducts = await Product.find()
  res.status(200).json(allProducts)
})

// Get details of a specific products using it's ID
router.get('/:id', async (req, res) => {
  try {
    const { id: _id } = req.params
    if (_id === 'all') {
      console.log('inside all', req.query.productIds)
      const productIds = req.query.productIds
      if (!productIds) {
        return res.status(400).send('No product IDs provided')
      }
      const products = await Product.find({
        _id: { $in: productIds },
      })
      return res.json(products)
    }
    console.log('_id', _id)
    const product = await Product.findById(_id)
    console.log('productId', _id)
    if (!product) {
      return res.status(404).send('Product not found')
    }
    res.json(product)
  } catch (err) {
    res.status(500).send('Error Fetching Product')
  }
})

// POST /products: Add a new product (admin only)
router.post('/', async (req, res) => {
  const {
    title,
    description,
    price,
    units,
    categories,
    measurements,
    colors,
    additionalInfo,
    images,
  } = req.body

  console.log('body', req)
  if (!title || !price || units === undefined) {
    return res.status(400).send('Missing required fields')
  }

  try {
    // let imageResult = null

    // if (images) {
    //   // Upload image if provided
    //   imageResult = await axios.post('/upload/image', {
    //     avatar: images,
    //   })
    //   console.log('imageResult', imageResult)
    // }

    // console.log('no image found', images, req.body)

    const newProduct = new Product({
      id: uuidv4(),
      title,
      description,
      price,
      units,
      categories,
      measurements,
      colors,
      additionalInfo,
      images,
    })

    const result = await newProduct.save()
    res.status(201).json(result)
  } catch (error) {
    res.status(500).send('Error saving product: ' + error.message)
  }
})

// PUT /products/:id: Update an existing product (admin only).
router.put('/:id', adminOnly, async (req, res) => {
  const {
    _id,
    title,
    description,
    price,
    discount,
    units,
    categories,
    measurements,
    colors,
    additionalInfo,
    images,
  } = req.body
  console.log('requestBody', req.body)
  if (!title || !price || !units) {
    return res.status(400).send('Missing required fields')
  }
  const productObj = {
    title,
    description,
    price,
    discount,
    units,
    categories,
    measurements,
    colors,
    additionalInfo,
    images,
  }

  const updatedProduct = await Product.findOneAndUpdate({ _id }, productObj, {
    new: true,
  })
  if (!updatedProduct) {
    return res.status(404).send('Product not found')
  }
  res.status(200).json(updatedProduct)
})

// DELETE /products/:id: Delete a product (admin only)
router.delete('/:id', adminOnly, async (req, res) => {
  const { id: _id } = req.params
  const result = await Product.findOneAndDelete({
    _id,
  })
  if (!result) {
    return res.status(404).json({ message: 'Product not found' })
  }
  console.log('result', result)
  res.status(200).json({
    message: 'Product deleted successfully',
    deletedProduct: result,
  })
})

// Delete All Products
router.delete('/', adminOnly, async (req, res) => {
  if (!req.headers['deleteAll'] === 'true') {
    return
  }
  const { id: _id } = req.params
  const result = await Product.deleteMany()
  if (!result) {
    return res.status(404).json({ message: 'Product not found' })
  }
  console.log('result', result)
  res.status(200).json({
    message: 'Product deleted successfully',
    deletedProduct: result,
  })
})

module.exports = router
