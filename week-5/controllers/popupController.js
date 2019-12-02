const { body, validationResult } = require("express-validator/check");
require("../models/with-mongoose/Popup");

// Model Schema Validator
exports.validate = method => {
  switch (method) {
    case "createPopup": {
      return [
        body("category", "Pop-up category can't be blank.")
          .exists()
          .isString(),
        body("popupTitle", "Pop-up title can't be blank.")
          .exists()
          .isString(),
        body("description", "Pop-up description can't be blank.")
          .exists()
          .isString(),
        body(
          "slots.date.from",
          "Slots from date is required and must be a date.",
        )
          .exists()
          .isISO8601(),
        body("slots.date.to", "Slots to date is required and must be a date.")
          .exists()
          .isISO8601(),
        body(
          "popupOrganizer.name",
          "Pop-up organizer is required and must be a String",
        )
          .exists()
          .isString(),
        body("popupOrganizer.websiteUrl", "Must be a valid URL.")
          .isURL({
            protocols: ["http", "https"],
            require_tld: true,
            require_protocol: true,
          })
          // Make this field optional when undefined or null
          .optional({ nullable: true }),
        // TODO: Email must be unique
        body(
          "popupOrganizer.email",
          "Email can't be blank and must be a valid email address.",
        )
          .exists()
          .isEmail(),
        body(
          "joinedOrganizers",
          "Joined organizers must be an array of strings.",
        )
          .isArray()
          .optional({ nullable: true }),
        body("guests", "Guests must be an array of strings.")
          .isArray()
          .optional({ nullable: true }),
      ];
    }
    case "updatePopup": {
      return [
        body("category", "Popup category must be a string.")
          .isString()
          .optional(),
        body("popupTitle", "Popup title must be a string.")
          .isString()
          .optional(),
        body(
          "description",
          "Pop-up description is required and can't be blank.",
        )
          .isString()
          .optional(),
        body("slots.date.from", "Slots to time must be a date.")
          .isISO8601()
          .optional(),
        body("slots.date.to", "Slots to time must be a date.")
          .isISO8601()
          .optional(),
        // TODO: Check if Popup host is group or user and apply corresponding properties
        body("popupOrganizer.name")
          .isString()
          .optional(),
        // TODO: Should be unique
        body("popupOrganizer.email", "Email must be a valid email address.")
          .isEmail()
          .optional(),
        body("popupOrganizer.websiteUrl", "Must be a valid URL.")
          .isURL({
            protocols: ["http", "https"],
            require_tld: true,
            require_protocol: true,
          })
          .optional(),
        body(
          "joinedOrganizers",
          "Joined organizers must be an array of strings.",
        )
          .isArray()
          .optional(),
        body("guests", "Guests must be an array of strings.")
          .isArray()
          .optional(),
      ];
    }
  }
};
