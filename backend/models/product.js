const mongoose =require("mongoose");

const ProductSchema = new Schema({
    name: {
      type: String,
      required: "Cannot add product without name",
      unique: true
    },
    imageUrl: {
      type: String,
      required: "Cannot add product without valid cover image",
      unique: true
    },
    description: {
      type: String,
      required: "Cannot add product without description",
     
    },
    countInStock: {
        type: Boolean,
        required: "Cannot add product without mentioning whether product is in stock or not"
      }
    })

    const Product = mongoose.model("Product", ProductSchema);

async function seedAllProducts() {
  try {
    products.forEach(async (product) => {
      const addedProduct = new Product(product);
      await addedProduct.save();
    });
    console.log("products added successfully")
  } catch (error) {
    console.error(error)
  }
}

module.exports =  { Product, seedAllProducts }