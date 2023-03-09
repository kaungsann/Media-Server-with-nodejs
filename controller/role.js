const roleDB = require("../model/role");
const permitDB = require("../model/permit");
const Helper = require("../utilites/helper");

const getRole = async (req, res, next) => {
  let results = await roleDB.find().populate("permit", "-_v");
  Helper.helper(res, " all get roles ", results);
};

const addRole = async (req, res, next) => {
  let findName = await roleDB.findOne({ name: req.body.name });
  if (findName) {
    next(new Error("Name is already in use"));
  }
  let results = await new roleDB(req.body).save();
  Helper.helper(res, "save role in server", results);
};

const getSingleRole = async (req, res, next) => {
  let findID = await roleDB.findById(req.params.id);
  if (findID) {
    Helper.helper(res, "get single  role", findID);
  }
};

const patchRole = async (req, res, next) => {
  let findID = await roleDB.findById(req.params.id);
  if (findID) {
    await roleDB.findByIdAndUpdate(findID._id, req.body);
    let results = await roleDB.findById(findID._id);
    Helper.helper(res, "edit role  ", results);
  } else {
    next(new Error(res, "no have with id "));
  }
};
const deleteRole = async (req, res, next) => {
  let findID = await roleDB.findById(req.params.id);
  if (findID) {
    await roleDB.findByIdAndDelete(findID._id);
    Helper.helper(res, "edit role  ");
  } else {
    next(new Error(res, "no have with id "));
  }
};

const addPermit = async (req, res, next) => {
  const role = await roleDB.findById(req.body.roleId);
  const permit = await permitDB.findById(req.body.permitId);
  if (role && permit) {
    await roleDB.findByIdAndUpdate(role._id, {
      $push: { permit: permit._id },
    });
    let result = await roleDB.findById(role._id);
    Helper.helper(res, "add permit ", result);
  } else {
    next(new Error(" id invalid pls try it again"));
  }
};
const removePermit = async (req, res, next) => {
  let role = await roleDB.findById(req.body.roleId);
  let permit = await permitDB.findById(req.body.permitId);
  if (role && permit) {
    await roleDB.findByIdAndUpdate(role._id, { $pull: { permit: permit._id } });
    let result = await roleDB.findById(role._id);
    Helper.helper(res, "add permit ", result);
  } else {
    next(new Error("id invalid"));
  }
};

module.exports = {
  getRole,
  addRole,
  patchRole,
  getSingleRole,
  deleteRole,
  addPermit,
  removePermit,
};
