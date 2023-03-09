const tagRouter = require("express").Router();
const tagController = require("../controller/tag");
const { saveFile } = require("../utilites/gallery");
const {
  validTOken,
  validBody,
  hasAnyRole,
  hasAnyPermit,
} = require("../utilites/valid");
tagRouter.get("/", tagController.getTagALL);
tagRouter.post(
  "/",
  validTOken(),
  hasAnyRole(["OWER", "Manager", "SUPERVISOR"]),
  hasAnyPermit(["CREATE", "DELETE", "EDIT"]),
  saveFile,
  tagController.addTag
);

tagRouter
  .route("/:id")
  .get(tagController.getTagSingle)
  .patch(
    validTOken(),
    hasAnyRole(["OWER", "Manager", "SUPERVISOR"]),
    hasAnyPermit(["CREATE", "DELETE", "EDIT"]),
    tagController.editTag
  )
  .delete(
    validTOken(),
    hasAnyRole(["OWER", "Manager", "SUPERVISOR"]),
    hasAnyPermit(["CREATE", "DELETE", "EDIT"]),
    tagController.dropTag
  );

module.exports = tagRouter;
