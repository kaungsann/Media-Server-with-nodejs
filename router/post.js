const postRouter = require("express").Router();
const { saveFile } = require("../utilites/gallery");
const { PostSchema, pageSchema } = require("../utilites/schema");
const {
  validTOken,
  validBody,
  hasAnyRole,
  hasAnyPermit,
  validId,
} = require("../utilites/valid");

const postController = require("../controller/post");

postRouter.get("/", postController.postAll);
postRouter.post(
  "/",
  validTOken(),

  hasAnyRole(["OWER", "Manager", "SUPERVISOR"]),
  hasAnyPermit(["CREATE", "DELETE", "EDIT"]),
  validBody(PostSchema),
  saveFile,
  postController.postAdd
);
postRouter.get("/bycat/:id", postController.bycat);
postRouter.post("/add/like/:id", validTOken(), postController.addLike);
postRouter.post(
  "/remove/like/:id",
  validTOken(),
  hasAnyRole(["OWER", "Manager", "SUPERVISOR"]),
  hasAnyPermit(["CREATE", "DELETE", "EDIT"]),
  postController.removeLike
);
postRouter.post(
  "/toggle/like/:id/:page",
  validTOken(),
  validId(pageSchema, "page"),
  postController.toggleLike
);
postRouter.get("/paginate/:pages", validTOken(), postController.paginate);

postRouter
  .route("/:id")
  .get(
    validTOken(),
    hasAnyRole(["OWER", "Manager", "SUPERVISOR"]),
    hasAnyPermit(["CREATE", "DELETE", "EDIT"]),
    postController.singleGet
  )
  .patch(
    validTOken(),
    hasAnyRole(["OWER", "Manager", "SUPERVISOR"]),
    hasAnyPermit(["CREATE", "DELETE", "EDIT"]),
    postController.editPost
  )
  .delete(
    validTOken(),
    hasAnyRole(["OWER", "Manager", "SUPERVISOR"]),
    hasAnyPermit(["CREATE", "DELETE", "EDIT"]),
    postController.dropPost
  );

module.exports = postRouter;
