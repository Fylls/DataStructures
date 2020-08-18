// Database implementation for handling products (w/ file)

const fs = require("fs")
const p = "products.json"

// THIS will refer to the object created with the class
// STATIC makes method accessible at class level

class Product {
  constructor(title, price, image, description) {
    this.title = title
    this.price = price
    this.image = image
    this.description = description
  }

  save() {
    fs.readFile(p, (err, fileContent) => {
      const products = []
      if (!err) products = JSON.parse(fileContent)

      products.push(this)

      fs.writeFile(p, JSON.stringify(products), err => console.log(err))
    })
  }

  static fetchAll() {
    fs.readFile(p, (err, fileContent) => {
      if (err) return []
      return JSON.parse(fileContent)
    })
  }
}

// Crerating and saving a product
const newProduct = new Product("Sasso", 10, "img", "un bel sasso")
newProduct.save()

// Getting all the products in the DB
Product.fetchAll()
