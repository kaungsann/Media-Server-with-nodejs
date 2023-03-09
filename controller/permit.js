const permitDB = require("../model/permit");
const Helper = require("../utilites/helper");

const getAllPermit = async (req, res, next) => {
  let results = await permitDB.find();
  Helper.helper(res, "get all permit", results);
};
const addPermit = async (req, res, next) => {
  let findName = await permitDB.findOne({ name: req.body.name });
  if (findName) {
    next(new Error("Name is already in use"));
  } else {
    let results = await new permitDB(req.body).save();
    Helper.helper(res, "save in server", results);
  }
};
const SinglePermit = async (req, res, next) => {
  let findId = await permitDB.findById(req.params.id);
  if (findId) {
    Helper.helper(res, "singlepermit", findId);
  } else {
    next(new Error("no have permit with that id"));
  }
};

const permitEdit = async (req, res, next) => {
  let findId = await permitDB.findById(req.params.id);
  if (findId) {
    await permitDB.findByIdAndUpdate(findId._id, req.body);
    let results = await permitDB.findById(findId._id);
    Helper.helper(res, "edit permit", results);
  } else {
    next(new Error("no have permit with that id"));
  }
};
const dropPermit = async (req, res, next) => {
  let findId = await permitDB.findById(req.params.id);
  if (findId) {
    await permitDB.findByIdAndDelete(findId._id);
    Helper.helper(res, "edit permit", results);
  } else {
    next(new Error("no have permit with that id"));
  }
};
module.exports = {
  getAllPermit,
  addPermit,
  permitEdit,
  dropPermit,
  SinglePermit,
};
