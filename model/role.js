const mongoose = require("mongoose");

const { Schema } = mongoose;

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  permit: [{ type: Schema.Types.ObjectId, ref: "permit" }],
  create: { type: Date, default: Date.now },
});

const Role = mongoose.model("role", roleSchema);

module.exports = Role;
