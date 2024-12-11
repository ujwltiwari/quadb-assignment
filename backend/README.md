# Project Name

This project is a Node.js application using Express.js framework. It provides various routes for handling products, cart, user authentication, and file uploads.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
  - [Products](#products)
  - [Cart](#cart)
  - [Authentication](#authentication)
  - [File Upload](#file-upload)
  - [Verify User](#verify-user)

## Installation

1. Clone the repository
2. Install dependencies using `ppnpm install`
3. Create a `.env` file with the necessary environment variables

## Usage

Start the server using:

```sh
ppnpm start
```

The server will run on `http://localhost:3000`.

## Routes

### Products

- **GET /products**: Fetch all products.
  - **Response**: Returns a list of all products in the database.
- **GET /products/:id**: Fetch details of a specific product by its ID.

  - **Params**: `id` - The ID of the product to fetch.
  - **Response**: Returns the details of the specified product. If `id` is 'all', it fetches products by IDs provided in the query parameter `productIds`.

- **POST /products**: Add a new product. Requires admin access.

  - **Body**: `title`, `description`, `price`, `units`, `categories`, `measurements`, `colors`, `additionalInfo`, `images`.
  - **Response**: Returns the newly created product.

- **PUT /products/:id**: Update an existing product by its ID. Requires admin access.

  - **Params**: `id` - The ID of the product to update.
  - **Body**: `title`, `description`, `price`, `discount`, `units`, `categories`, `measurements`, `colors`, `additionalInfo`, `images`.
  - **Response**: Returns the updated product.

- **DELETE /products/:id**: Delete a product by its ID. Requires admin access.

  - **Params**: `id` - The ID of the product to delete.
  - **Response**: Returns a message indicating the product was deleted successfully.

- **DELETE /products**: Delete all products. Requires admin access.
  - **Headers**: `deleteAll` - Should be 'true' to delete all products.
  - **Response**: Returns a message indicating all products were deleted successfully.

### Cart

- **GET /cart**: Fetch all items in the cart.

  - **Response**: Returns a list of all items in the cart.

- **GET /cart/:id**: Fetch details of a specific cart item by its ID.

  - **Params**: `id` - The ID of the cart item to fetch.
  - **Response**: Returns the details of the specified cart item.

- **POST /cart**: Add an item to the cart.

  - **Body**: `productId`, `quantity`, `userId`.
  - **Response**: Returns the newly added cart item or updates the quantity if the item already exists in the cart.

- **DELETE /cart/:id**: Remove an item from the cart by its ID.

  - **Params**: `id` - The ID of the cart item to remove.
  - **Response**: Returns the removed cart item.

- **DELETE /cart**: Remove all items from the cart.
  - **Response**: Returns a message indicating all cart items were deleted successfully.

### Authentication

- **POST /register**: Register a new user.

  - **Body**: `username`, `password`.
  - **Response**: Returns a message indicating the user was registered successfully.

- **POST /login**: Login a user.
  - **Body**: `username`, `password`.
  - **Response**: Returns a token if the login is successful.

### File Upload

- **POST /upload**: Upload a file. The file is temporarily saved in the `uploads/` directory and then uploaded to S3.
  - **Form Data**: `file` - The file to upload.
  - **Response**: Returns a message indicating the file was uploaded successfully along with the result from S3.

### Verify User

- **POST /verify**: Verify the authenticated user. Requires authentication middleware.
  - **Response**: Returns a message indicating success and the authenticated user's details.

## License

This project is licensed under the MIT License.

```

Make sure to save this content in your

README.md

 file and open it in a text editor that displays the full content.
```
