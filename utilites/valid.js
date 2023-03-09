const jwt = require("jsonwebtoken");
const userDB = require("../model/user");
module.exports = {
  validBody: (schema) => {
    return (req, res, next) => {
      let results = schema.validate(req.body);
      if (results.error) {
        next(new Error(results.error.details[0].message));
      } else {
        next();
      }
    };
  },
  validId: (schema, name) => {
    return (req, res, next) => {
      let obj = {};
      obj[`${name}`] = req.params[`${name}`];
      let results = schema.validate(obj);
      if (results.error) {
        next(new Error(results.error.details[0].message));
      } else {
        next();
      }
    };
  },
  validTOken: () => {
    return async (req, res, next) => {
      let token = req.headers.authorization;

      if (token) {
        let userToken = token.split(" ")[1];
        let userDecode = jwt.decode(userToken, process.env.SCREAT_KEY);
        if (userDecode) {
          let findUser = await userDB
            .findById(userDecode._id)
            .populate("role permit");

          req.user = findUser;
          next();
        } else {
          next(new Error("authorization error"));
        }
      } else {
        next(new Error("authorization error"));
      }
    };
  },
  validOwer: (role) => {
    return async (req, res, next) => {
      let valid = req.user.role.find((rol) => rol.name == role);
      if (valid) {
        next();
      } else {
        next(new Error("you don't have with that permission"));
      }
    };
  },
  hasAnyRole: (roles) => {
    return (req, res, next) => {
      let bol = false;
      for (let i = 0; i < roles.length; i++) {
        let hasRole = req.user.role.find((role) => role.name == roles[i]);
        if (hasRole) {
          bol = true;
          break;
        }
      }
      if (bol) {
        next();
      } else {
        next(new Error("You don't with that permission"));
      }
    };
  },
  hasAnyPermit: (permits) => {
    return (req, res, next) => {
      let bol = false;
      for (let i = 0; i < permits.length; i++) {
        let hasPermit = req.user.permit.find((per) => per.name == permits[i]);
        if (hasPermit) {
          bol = true;
          break;
        }
      }
      if (bol) {
        next();
      } else {
        next(new Error("You don't with that permission"));
      }
    };
  },
};
