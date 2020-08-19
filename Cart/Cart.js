// Cart implementation for handling products (w/ file)

const fs = require("fs")
const p = "products.json"

// THIS will refer to the object created with the class
// STATIC makes method accessible at class level

// TO KEEP IN MIND: there is always a cart in an e-commerce app, so we do not need a constructor

class Cart {
  // add a product to cart, if not existing, create one

  static async addProduct(id, productPrice) {
    // Fetch the previous cart
    let cart = { products: [], totalPrice: 0 }
    const fileContent = await fs.readFile(p)

    if (fileContent) cart = JSON.parse(fileContent)

    // Analyze the cart => Find existing product
    const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
    const existingProduct = cart.products[existingProductIndex]

    let updatedProduct

    // Add new product/ increase quantity
    if (existingProduct) {
      updatedProduct = { ...existingProduct }
      updatedProduct.qty = updatedProduct.qty + 1
      cart.products = [...cart.products]
      cart.products[existingProductIndex] = updatedProduct
    } else {
      updatedProduct = { id: id, qty: 1 }
      cart.products = [...cart.products, updatedProduct]
    }

    cart.totalPrice = cart.totalPrice + productPrice
    fs.writeFileSync(p, JSON.stringify(cart))
  }

  // Deleting a product from cart IF existing

  static async deleteProduct(id, productPrice) {
    const fileContent = await fs.readFile(p)
    if (!fileContent) return

    const updatedCart = { ...JSON.parse(fileContent) }
    const product = updatedCart.products.find(prod => prod.id === id)
    if (!product) return

    const productQty = product.qty
    updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
    updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty

    fs.writeFileSync(p, JSON.stringify(updatedCart))
  }

  // Getting all the Cart Object

  static async getCart() {
    const fileContent = await fs.readFile(p)
    const cart = JSON.parse(fileContent)
    if (!fileContent) return null
    else return cart
  }
}
