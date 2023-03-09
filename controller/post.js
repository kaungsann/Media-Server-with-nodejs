const postDB = require("../model/post");
const Helper = require("../utilites/helper");

const postAll = async (req, res, next) => {
  let results = await postDB.find();
  Helper.helper(res, "get all post ", results);
};
const postAdd = async (req, res, next) => {
  let userId = req.user._id;
  delete req.user;
  req.body.user = userId;

  let results = await new postDB(req.body).save();
  Helper.helper(res, "add post", results);
};
const bycat = async (req, res, next) => {
  let findName = await postDB.find({ category: req.params.id });
  if (findName) {
    Helper.helper(res, "all cat", findName);
  } else {
    next(new Error("no have with that id"));
  }
};
const singleGet = async (req, res, next) => {
  let findId = await postDB.findById(req.params.id);
  if (findId) {
    Helper.helper(res, "single post ", findId);
  } else {
    next(new Error("category id is not exist"));
  }
};

const editPost = async (req, res, next) => {
  let findId = await postDB.findById(req.params.id);
  if (findId) {
    await postDB.findByIdAndUpdate(findId._id, req.body);
    let results = await await postDB.findById(findId_.id);
    Helper.helper(res, "edit post ", results);
  } else {
    next(new Error("category id is not exist"));
  }
};

const dropPost = async (req, res, next) => {
  let findId = await postDB.findById(req.params.id);
  if (findId) {
    await postDB.findByIdAndDelete(findId._id);
    Helper.helper(res, "delete post ");
  } else {
    next(new Error("category id is not exist"));
  }
};
const addLike = async (req, res, next) => {
  //let pages = req.params.pages
  let post = await postDB.findById(req.params.id);
  if (post) {
    post.like = post.like + 1;
    await postDB.findByIdAndUpdate(post._id, post);
    let results = await postDB.findById(post._id);
    Helper.helper(res, "edit post ", results);
  } else {
    next(new Error("no have with that it"));
  }
};
const removeLike = async (req, res, next) => {
  //let pages = req.params.pages
  let post = await postDB.findById(req.params.id);
  if (post) {
    post.like = post.like - 1;
    await postDB.findByIdAndUpdate(post._id, post);
    let results = await postDB.findById(post._id);
    Helper.helper(res, "edit post ", results);
  } else {
    next(new Error("no have with that it"));
  }
};
const toggleLike = async (req, res, next) => {
  let post = await postDB.findById(req.params.id);
  if (post) {
    if (req.params.page == 0) {
      post.like = post.like + 1;
    } else {
      post.like = post.like - 1;
    }
    await postDB.findByIdAndUpdate(post._id, post);
    let results = await postDB.findById(post._id);
    Helper.helper(res, "edit post ", results);
  }
};
const paginate = async (req, res, next) => {
  let pages = req.params.pages;
  pages == 1 ? 0 : pages - 1;
  let limit = Number(process.env.POST_LIMIT);
  let postCount = pages * limit;
  let results = await postDB.find().limit(limit).skip(postCount);
  Helper.helper(res, "edit post ", results);
};

module.exports = {
  postAll,
  postAdd,
  bycat,
  editPost,
  singleGet,
  dropPost,
  addLike,
  removeLike,
  toggleLike,
  paginate,
};
