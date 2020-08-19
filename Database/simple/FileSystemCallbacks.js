// Database implementation for handling products (w/ file)

const fs = require("fs")
const p = "products.json"

// THIS will refer to the object created with the class
// STATIC makes method accessible at class level

// Helper Function
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) cb([])
    else cb(JSON.parse(fileContent))
  })
}

// DB has a Product collection (Schema)
class Product {
  constructor(title, price, image, description) {
    this.title = title
    this.price = price
    this.image = image
    this.description = description
  }

  save() {
    getProductsFromFile(products => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products))
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }
}

// Crerating and saving a product
const newProduct = new Product("Sasso", 10, "img", "un bel sasso")
newProduct.save()

// Getting all the products in the DB
const allProducts = Product.fetchAll(products => console.log(products))
