let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
module.exports = {
  helper: (res, mes = "", result = []) => {
    res.json({
      con: true,
      mes,
      result,
    });
  },
  encodePassword: (password) => bcrypt.hashSync(password),
  compareSync: (plainPs, changePs) => bcrypt.compareSync(plainPs, changePs),
  token: (comeuserinfo) =>
    jwt.sign(comeuserinfo, process.env.SCREAT_KEY, { expiresIn: "3hr" }),
};
