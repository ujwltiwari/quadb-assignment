const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const productRoutes = require('./routes/products')
const cartRoutes = require('./routes/cart')
const registerRoute = require('./routes/(auth)/register')
const loginRoute = require('./routes/(auth)/login')
const uploadRoute = require('./routes/upload')
const verifyRoute = require('./routes/verifyUser')
const cors = require('cors')
const connectDB = require('./lib/db')

connectDB()
// Middleware to parse JSON
app.use(express.json())
app.use(cors())

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, Express with pnpm!')
})

app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/upload', uploadRoute)
app.use('/verify', verifyRoute)

// Start the server
app.listen(9000, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
