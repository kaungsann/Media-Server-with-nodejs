const roleRouter = require("express").Router();
const roleController = require("../controller/role");
const { validTOken, hasAnyRole, hasAnyPermit } = require("../utilites/valid");

roleRouter.get(
  "/",
  validTOken(),
  hasAnyRole(["OWER", "Manager", "SUPERVISOR"]),
  hasAnyPermit(["CREATE", "DELETE", "EDIT"]),
  roleController.getRole
);
roleRouter.post(
  "/",
  // validTOken(),
  // hasAnyRole(["OWER", "Manager", "SUPERVISOR"]),
  roleController.addRole
);
roleRouter.post("/add/permit", roleController.addPermit);
roleRouter.post("/remove/permit", roleController.removePermit);
roleRouter
  .route("/:id")
  .get(roleController.getSingleRole)
  .patch(roleController.patchRole)
  .delete(roleController.deleteRole);
module.exports = roleRouter;
