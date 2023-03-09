const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, required: true, ref: "post" },
  text: { type: String, required: true },
  image: { type: String, required: true },
  create: { type: Date, default: Date.now },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
