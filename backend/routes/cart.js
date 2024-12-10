const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')

router.get('/', async (req, res) => {
  const allCartItems = await Cart.find()
  return res.status(200).json(allCartItems)
})

router.get('/:id', async (req, res) => {
  const productId = req.body._id
  const cartItem = await Cart.findOne(productId)
  return res.status(200).json(cartItem)
})

// POST => Add an item to the cart
router.post('/', async (req, res) => {
  const { productId, quantity, userId } = req.body
  const existingItem = await Cart.findOne({
    userId,
    productId,
  })

  if (existingItem) {
    existingItem.quantity += quantity
    await existingItem.save()
    return res.status(200).json(existingItem)
  }

  const newCartItem = new Cart({
    userId,
    productId,
    quantity,
  })

  const result = await newCartItem.save()
  return res.status(200).json(result)
})

// DELETE /cart/:id: Remove an item from the cart.
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const result = await Cart.findByIdAndDelete(id)
  if (!result) {
    return res.status(404).send('Product not found')
  }

  return res.status(200).json(result)
})

// DELETE All /cart/:id: Remove an item from the cart.
router.delete('/', async (req, res) => {
  const result = await Cart.deleteMany()
  if (!result) {
    return res.status(404).send('Could Not delete all cart items')
  }

  return res.status(200).json(result)
})

module.exports = router
