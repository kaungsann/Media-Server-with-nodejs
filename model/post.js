const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  category: { type: Schema.Types.ObjectId, required: true, ref: "category" },
  tag: { type: Schema.Types.ObjectId, required: true, ref: "tag" },
  text: { type: String, required: true },
  like: { type: Number, default: 0 },
  comment: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  image: { type: String },
  create: { type: Date, default: Date.now },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
