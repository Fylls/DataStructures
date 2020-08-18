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
  constructor(title, price, image, description) {
    this.title = title
    this.price = price
    this.image = image
    this.description = description
  }

  async save() {
    const products = JSON.parse(await getProductsFromFile())
    products.push(this)
    await fs.writeFileSync(p, JSON.stringify(products))
  }

  static async fetchAll() {
    await getProductsFromFile()
  }
}

// Crerating and saving a product
const newProduct = new Product("Sasso", 10, "img", "un bel sasso")
await newProduct.save()

// Getting all the products in the DB
const allProducts = await Product.fetchAll()
