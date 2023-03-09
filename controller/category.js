let categoryDB = require("../model/category");
const helper = require("../utilites/helper");
const getCatgeory = async (req, res, next) => {
  let findCataegory = await categoryDB.find();
  helper.helper(res, " get category ", findCataegory);
};

const addCategory = async (req, res, next) => {
  let findName = await categoryDB.findOne({ name: req.body.name });
  if (findName) {
    next(new Error("Name is already in use"));
  } else {
    let results = await new categoryDB(req.body).save();
    helper.helper(res, "save data", results);
  }
};

const singleCategory = async (req, res, next) => {
  let findId = await categoryDB.findById(req.params.id);
  if (findId) {
    helper.helper(res, "get single category", findId);
  } else {
    next(new Error("no category with that id"));
  }
};

const editCategory = async (req, res, next) => {
  let findID = await categoryDB.findById(req.params.id);
  if (findID) {
    await categoryDB.findByIdAndUpdate(findID._id, req.body);
    let results = await categoryDB.findById(findID._id);
    helper.helper(res, "Edit category", results);
  }
};

const dropCategory = async (req, res, next) => {
  let findId = await categoryDB.findById(req.params.id);
  if (findId) {
    await categoryDB.findByIdAndDelete(findId._id);
    helper.helper(res, "Delete that category");
  } else {
    next(new Error("no category with that id"));
  }
};

module.exports = {
  getCatgeory,
  addCategory,
  singleCategory,
  editCategory,
  dropCategory,
};
