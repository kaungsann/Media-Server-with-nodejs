const categoryRouter = require("express").Router();
const { saveFile } = require("../utilites/gallery");
const {
  validTOken,
  validBody,
  hasAnyRole,
  hasAnyPermit,
} = require("../utilites/valid");

const catController = require("../controller/category");

categoryRouter.get("/", catController.getCatgeory);
categoryRouter.post(
  "/",
  saveFile,
  validTOken(),
  hasAnyRole(["OWER", "Manager", "SUPERVISOR"]),
  hasAnyPermit(["CREATE", "DELETE", "EDIT"]),
  catController.addCategory
);

module.exports = categoryRouter;
