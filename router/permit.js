const permitRouter = require("express").Router();

const permitController = require("../controller/permit");
const {
  validTOken,
  validBody,
  hasAnyRole,
  hasAnyPermit,
} = require("../utilites/valid");

permitRouter.get("/", permitController.getAllPermit);
permitRouter.post(
  "/",
  validTOken(),
  hasAnyRole(["OWER", "Manager", "SUPERVISOR"]),
  hasAnyPermit(["CREATE", "DELETE", "EDIT"]),
  permitController.addPermit
);

permitRouter
  .route("/:id")
  .get(permitController.SinglePermit)
  .patch(
    validTOken(),
    hasAnyRole(["OWER", "Manager", "SUPERVISOR"]),
    hasAnyPermit(["CREATE", "DELETE", "EDIT"]),
    permitController.permitEdit
  )
  .delete(
    validTOken(),
    hasAnyRole(["OWER", "Manager", "SUPERVISOR"]),
    hasAnyPermit(["CREATE", "DELETE", "EDIT"]),
    permitController.dropPermit
  );

module.exports = permitRouter;
