const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  totalAmount: { type: Number },
  totalItems: { type: Number },
  items: { type: [Schema.Types.Mixed], required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  //TODO : enum type
  paymentMethod: { type: String, required: true },
  status: { type: String, default: "pending" },
  selectedAddress: { type: Schema.Types.Mixed, required: true },
});

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Order = mongoose.model("Order", orderSchema);
