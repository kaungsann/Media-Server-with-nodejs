const userRouter = require("express").Router();

const userController = require("../controller/user");
const {
  registerSchema,
  loginSchema,
  idSchema,
  addRoleSchema,
  addPermitSchema,
} = require("../utilites/schema");
const {
  validBody,
  validId,
  validTOken,
  validOwer,
} = require("../utilites/valid");

userRouter.get("/", userController.getUser);
userRouter.post(
  "/register",
  validBody(registerSchema),
  userController.register
);
userRouter.post("/login", validBody(loginSchema), userController.login);
userRouter.post(
  "/add/role",
  validTOken(),
  validOwer("OWER"),
  validBody(addRoleSchema),
  userController.addrole
);
userRouter.post(
  "/remove/role",
  validTOken(),
  validOwer("OWER"),
  validBody(addRoleSchema),
  userController.removeRole
);
userRouter.post(
  "/add/permit",
  validTOken(),
  validOwer("OWER"),
  validBody(addPermitSchema),
  userController.addPermit
);
userRouter.post(
  "/remove/permit",
  validTOken(),
  validOwer("OWER"),
  validBody(addPermitSchema),
  userController.removePermit
);

userRouter
  .route("/:id")
  .get(validTOken(), validId(idSchema, "id"), userController.getId)
  .patch(validTOken(), validId(idSchema, "id"), userController.userEdit)
  .delete(validTOken(), validId(idSchema, "id"), userController.deleteUser);

module.exports = userRouter;
