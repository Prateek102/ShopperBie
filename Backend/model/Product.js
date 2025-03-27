const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: [0, "wrong min price"],
    max: [10000, "wrong max price"],
  },
  discountPercentage: {
    type: Number,
    min: [1, "wrong min discount"],
    max: [99, "wrong max discount"],
  },
  rating: {
    type: Number,
    min: [1, "wrong min rating"],
    max: [5, "wrong max rating"],
    default: 1,
  },
  stock: {
    type: Number,
    min: [0, "wrong min stock"],
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  deleted: { type: Boolean, default: false },
});

//get set function used to ensure _id is returned as id as id is used in frontend
const virtual = productSchema.virtual("id"); //make virtual data field
virtual.get(function () {
  return this._id;
});

//in db _id remains but in frontend returned as id
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Product = mongoose.model("Product", productSchema);
