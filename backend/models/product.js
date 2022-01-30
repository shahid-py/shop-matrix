const mongoose =require("mongoose");

const productSchema = mongoose.Schema({
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
        type: String,
        required: "Cannot add product without mentioning whether product is in stock or not"
      }
    });

    const Product = mongoose.model("product", productSchema);



module.exports =  Product;