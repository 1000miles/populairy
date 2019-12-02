const { body } = require("express-validator/check");
require("../models/with-mongoose/User");

// User Schema Validator
exports.validate = method => {
  switch (method) {
    case "createUser": {
      return [
        body("firstName", "First name can't be blank")
          .isString()
          .exists(),
        body("lastName", "Last name can't be blank")
          .isString()
          .exists(),
        body("email", "Email can't be blank")
          .isEmail()
          .exists(),
        body("role")
          .isString()
          .exists(),
        body("phoneNumber", "Phone number must be a string.")
          .isString()
          .optional(),
        body("events", "Events must be an array of strings.")
          .isArray()
          .optional(),
        body("popups", "Pop-ups must be an array of strings.")
          .isArray()
          .optional(),
      ];
    }
    case "updateUser": {
      return [
        body("firstName", "First name must be a string.")
          .isString()
          .optional(),
        body("lastName", "Last name must be a string.")
          .isString()
          .optional(),
        body("email", "Email can't be blank")
          .isEmail()
          .optional(),
        body("role")
          .isString()
          .optional(),
        body("phoneNumber", "Phone number must be a string.")
          .isString()
          .optional(),
        body("events", "Events must be an array of strings.")
          .isArray()
          .optional(),
        body("popups", "Pop-ups must be an array of strings.")
          .isArray()
          .optional(),
      ];
    }
  }
};
