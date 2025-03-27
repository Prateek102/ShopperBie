const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  quantity: { type: Number, required: true },
  //ref passed so now all info of that product directly accessed through schema
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

//get set function used to ensure _id is returned as id as id is used in frontend
const virtual = cartSchema.virtual("id"); //make virtual data field
virtual.get(function () {
  return this._id;
});

//in db _id remains but in frontend returned as id
cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Cart = mongoose.model("Cart", cartSchema);
