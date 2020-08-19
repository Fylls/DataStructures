// Cart implementation for handling products (w/ file)

const fs = require("fs")
const p = "products.json"

// THIS will refer to the object created with the class
// STATIC makes method accessible at class level

class Cart {
  static addProduct(id, productPrice) {
    //*

    // Fetch the previous cart

    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }

      if (!err) cart = JSON.parse(fileContent)

      // Analyze the cart => Find existing product
      const indexToUpdate = cart.products.findIndex(prod => prod.id === id)
      const existingProduct = cart.products[indexToUpdate]

      let updatedProduct

      // Add new product / increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct }
        updatedProduct.qty = updatedProduct.qty + 1
        cart.products = [...cart.products]
        cart.products[indexToUpdate] = updatedProduct
      } else {
        updatedProduct = { id: id, qty: 1 }
        cart.products = [...cart.products, updatedProduct]
      }

      cart.totalPrice = cart.totalPrice + +productPrice
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err)
      })
    })
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) return

      const uCart = { ...JSON.parse(fileContent) }
      const product = uCart.products.find(prod => prod.id === id)
      if (!product) return

      const productQty = product.qty
      uCart.products = uCart.products.filter(prod => prod.id !== id)
      uCart.totalPrice = uCart.totalPrice - productPrice * productQty

      fs.writeFile(p, JSON.stringify(uCart), err => {
        console.log(err)
      })
    })
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent)
      if (err) cb(null)
      else cb(cart)
    })
  }
}
