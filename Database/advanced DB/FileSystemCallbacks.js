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
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  // Saving or updating
  // IF it has an ID it already is in the sdistem => update it
  // IF no ID, add it to the system

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => {
          prod.id === this.id
        })

        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this

        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err)
        })
      } else {
        this.id = Math.random().toString()
        products.push(this)

        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err)
        })
      }
    })
  }

  // Deleting a product by knowing its ID both in DB and CART

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id)
      const updatedProducts = products.filter(prod => prod.id !== id)

      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err)
      })
    })
  }

  // getting all the products in the DB

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }

  // getting all details of a product by knowing its ID

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      cb(product)
    })
  }
}

//

/*====================================================================================*/

//                               E   X   A   M   P   L   E

// crerating a product
const newProduct = new Product("Sasso", 10, "img", "un bel sasso")

// Saving the product in the DB
newProduct.save()

// updating product in DB
newProduct.description = "un brutto sasso"
newProduct.save()

// Deliting a product in both DB and Cart
Product.deleteById("21384610293840")

// Getting all details of a product
Product.findById("21384610293840", product => console.log(product))

// Getting all the products in the DB
const allProducts = Product.fetchAll(products => console.log(products))
