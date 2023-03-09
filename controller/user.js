const userDB = require("../model/user");
const roleDB = require("../model/role");
const permitDB = require("../model/permit");
const Helper = require("../utilites/helper");
const helper = require("../utilites/helper");
const getUser = async (req, res, next) => {
  let userDb = await userDB.find().populate("permit role").select("-password");
  Helper.helper(res, " hello server ", userDb);
};

const register = async (req, res, next) => {
  let findName = await userDB.findOne({ name: req.body.name });
  if (findName) {
    next(new Error("Name is already in use"));
  }
  let findEmail = await userDB.findOne({ email: req.body.email });
  if (findEmail) {
    next(new Error("Email is already in use"));
  }
  let findPhone = await userDB.findOne({ email: req.body.email });
  if (findPhone) {
    next(new Error("Phone is already in use"));
  }
  req.body.password = helper.encodePassword(req.body.password);
  let results = await new userDB(req.body).save();
  console.log(req.body.password);
  helper.helper(res, "save user data ", results);
};

const login = async (req, res, next) => {
  let findEmail = await userDB.findOne({ email: req.body.email });
  if (findEmail) {
    let userCompare = helper.compareSync(req.body.password, findEmail.password);
    if (userCompare) {
      let user = findEmail.toObject();
      delete user.password;
      user.token = helper.token(user);
      Helper.helper(res, "login successful", user);
    } else {
      next(new Error("something is wrong password pls try it again"));
    }
  } else {
    next(new Error("You need to first register"));
  }
};

const getId = async (req, res, next) => {
  let findUser = await userDB.findById(req.params.id);
  if (findUser) {
    helper.helper(res, "get user Id", findUser);
  } else {
    next(new Error("there is no have a user"));
  }
};

const userEdit = async (req, res, next) => {
  let findId = await userDB.findById(req.params.id);
  if (findId) {
    await userDB.findByIdAndUpdate(findId._id, req.body);
    let results = await userDB.findById(findId._id);
    helper.helper(res, "edit user", results);
  } else {
    next(new Error("there is no have a user ID "));
  }
};

const deleteUser = async (req, res, next) => {
  let findUser = await userDB.findById(req.params.id);
  if (findUser) {
    await userDB.findByIdAndDelete(findUser._id);
    helper.helper(res, "delete user");
  } else {
    next(new Error("there is no have a user ID "));
  }
};

const addrole = async (req, res, next) => {
  let userId = await userDB.findById(req.body.userId);
  let roleId = await roleDB.findById(req.body.roleId);
  let findRole = await userId.role.find((rid) => rid._id.equals(roleId._id));
  if (findRole) {
    next(new Error("Role is already in exists"));
  } else {
    await userDB.findByIdAndUpdate(userId._id, { $push: { role: roleId } });
    let results = await userDB.findById(userId._id);
    Helper.helper(res, "add role ", results);
  }
};
const removeRole = async (req, res, next) => {
  let userId = await userDB.findById(req.body.userId);
  let roleId = await userDB.findById(req.body.roleId);
  let findRole = await userId.role.find((rid) => rid._id.equals(roleId._id));
  if (findRole) {
    await userDB.findByIdAndUpdate(userId._id, { $pull: { role: roleId._id } });
    let results = await userDB.findById(userId._id);
    Helper.helper(res, "add role ", results);
  } else {
    next(new Error("Role doesn't exist"));
  }
};

const addPermit = async (req, res, next) => {
  let userId = await userDB.findById(req.body.userId);
  let permitId = await permitDB.findById(req.body.permitId);
  let findPermit = await userId.permit.find((per) =>
    per._id.equals(permitId._id)
  );
  if (findPermit) {
    next(new Error("Role is already in exists"));
  } else {
    await userDB.findByIdAndUpdate(userId._id, {
      $push: { permit: permitId._id },
    });
    let results = await userDB.findById(userId._id);
    Helper.helper(res, "add role ", results);
  }
};

const removePermit = async (req, res, next) => {
  let userId = await userDB.findById(req.body.userId);
  let permitId = await permitDB.findById(req.body.permitId);
  let findPermit = await req.user.permit.find((per) =>
    per._id.equals(permitId._id)
  );
  if (findPermit) {
    await userDB.findByIdAndUpdate(userId._id, {
      $pull: { permit: permitId._id },
    });
    let results = await userDB.findById(userId._id);
    Helper.helper(res, "add role ", results);
  } else {
    next(new Error("permit doesn't exist"));
  }
};

module.exports = {
  getUser,
  register,
  login,
  getId,
  userEdit,
  deleteUser,
  addrole,
  removeRole,
  addPermit,
  removePermit,
};
