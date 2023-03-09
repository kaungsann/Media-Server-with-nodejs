let fs = require("fs");
const bcrypt = require("bcryptjs");
const userDB = require("../model/user");
const roleDB = require("../model/role");
const permitDB = require("../model/permit");

const migrate = async (req, res, next) => {
  let readData = fs.readFileSync("./Migration/users.json");
  let users = JSON.parse(readData);
  users.forEach(async (user) => {
    user.password = bcrypt.hashSync(user.password);

    let results = await new userDB(user).save();
    console.log(results);
  });
};

const backup = async (req, res, next) => {
  let userDb = await userDB.find();
  fs.writeFileSync("./Migration/Backup/users.json", JSON.stringify(userDb));
  console.log("Done backup data");
};

const sendRoleDB = async (req, res, next) => {
  let data = fs.readFileSync("./Migration/roles.json");
  let changeData = JSON.parse(data);
  changeData.forEach(async (role) => {
    let results = await new roleDB(role).save();
    console.log(results);
  });
};

const sendPermitDB = async (req, res, next) => {
  let data = fs.readFileSync("./Migration/permits.json");
  let changeData = JSON.parse(data);
  changeData.forEach(async (per) => {
    let results = await new permitDB(per).save();
    console.log(results);
  });
};
const addOwerRole = async (req, res, next) => {
  let user = await userDB.findOne({ name: "kaungsanhein" });
  let role = await roleDB.findOne({ name: "OWER" });
  await userDB.findByIdAndUpdate(user._id, { $push: { role: role._id } });
};
const addMangerRole = async (req, res, next) => {
  let user = await userDB.findOne({ name: "phoekaung" });
  let role = await roleDB.findOne({ name: "Manager" });
  await userDB.findByIdAndUpdate(user._id, { $push: { role: role._id } });
};
const addPermitOwer = async (req, res, next) => {
  let user = await userDB.findOne({ name: "kaungsanhein" });
  let permit = await permitDB.find();
  await userDB.findByIdAndUpdate(user._id, { $push: { permit: permit } });
};

module.exports = {
  migrate,
  backup,
  sendRoleDB,
  sendPermitDB,
  addOwerRole,
  addMangerRole,
  addPermitOwer,
};
