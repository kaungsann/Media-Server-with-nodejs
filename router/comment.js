const commentRouter = require("express").Router();
const commentController = require("../controller/comment");

commentRouter.get("/", commentController.getall);

module.exports = commentRouter;
