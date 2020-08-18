// Database implementation for handling products

const database = []

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
    database.push(this)
  }

  static fetchAll() {
    return database
  }
}

// Crerating and saving a product
const newProduct = new Product("Sasso", 10, "img", "un bel sasso")
newProduct.save()

// Getting all the products in the DB
Product.fetchAll()
