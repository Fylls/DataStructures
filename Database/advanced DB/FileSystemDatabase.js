// Database implementation for handling products (w/ file)

const fs = require("fs")
const p = "products.json"

// THIS will refer to the object created with the class
// STATIC makes method accessible at class level

// Helper Function
const getProductsFromFile = async () => {
  await fs.readFile(p, (err, fileContent) => {
    if (err || !fileContent) return []
    return JSON.parse(fileContent)
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

  async save() {
    const products = await getProductsFromFile()

    if (this.id) {
      const indexToUpdate = products.findIndex(pr => pr.id === this.id)
      products[indexToUpdate] = this
      fs.writeFileSync(p, JSON.stringify(products))
    } else {
      this.id = Math.random().toString()
      products.push(this)
      fs.writeFileSync(p, JSON.stringify(products))
    }
  }

  // Deleting a product by knowing its ID

  static async deleteById(id) {
    const products = await getProductsFromFile()
    const updatedProducts = products.filter(prod => prod.id !== id)
    fs.writeFileSync(p, JSON.stringify(updatedProducts))
  }

  // getting all the products in the DB

  static async fetchAll() {
    await getProductsFromFile()
  }

  // getting all details of a product by knowing its ID

  static async findById(id) {
    const products = await getProductsFromFile()
    const product = products.find(p => p.id === id)
    return product
  }
}

//

/*====================================================================================*/

//                               E   X   A   M   P   L   E

// crerating a product
const newProduct = new Product("Sasso", 10, "img", "un bel sasso")

// Saving the product in the DB
await newProduct.save()

// updating product in DB
newProduct.description = "un brutto sasso"
await newProduct.save()

// Deliting a product in DB
await Product.deleteById("21384610293840")

// Getting all details of a product
const product = await Product.findById("21384610293840")

// Getting all the products in the DB
const allProducts = await Product.fetchAll()
