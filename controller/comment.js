const commentDB = require("../model/comment");
const Helper = require("../utilites/helper");
const getall = async (req, res, next) => {
  let results = await commentDB.find();
  Helper.helper(res, "get all comment ", results);
};

module.exports = {
  getall,
};
