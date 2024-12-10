const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
    },
    categories: {
      type: [String],
    },

    units: {
      type: Number,
      required: true,
    },
    measurements: {
      type: String,
    },
    colors: {
      type: [String],
    },

    additionalInfo: {
      type: String,
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product
