const { check } = require("express-validator/check");
// const Event = require('../models/with-mongoose/EventNEW');

// Model Schema Validator
exports.validate = method => {
  switch (method) {
    case "createEvent": {
      return [
        check("eventType", "Event type can't be blank.")
          .exists()
          .isString(),
        check("eventName", "Event name can't be blank.")
          .exists()
          .isString(),
        check("location.address.additionalInfo")
          .optional()
          .isString(),
        check("location.address.streetName", "Street name can't be blank.")
          .exists()
          .isString(),
        check("location.address.houseNumber", "House number can't be blank.")
          .exists()
          .isString(),
        check("location.address.postCode", "Post code can't be blank.")
          .exists()
          .isString(),
        check("location.address.city", "City can't be blank.")
          .exists()
          .isString(),
        check("location.address.country", "Country can't be blank.")
          .exists()
          .isString(),
        check("date.week_day.from", "Week day from can't be blank.")
          .exists()
          .isString(),
        check("date.week_day.to", "Week day to can't be blank.")
          .exists()
          .isString(),
        // TODO: Change to .isISO8601() later
        check("date.start_datetime", "Start date and time can't be blank.")
          .exists()
          .isString(),
        // TODO: Change to .isISO8601() later
        check("date.end_datetime", "End date and time can't be blank.")
          .exists()
          .isString(),
        // TODO: Check if event host is group or user and apply corresponding properties
        check("eventHost.group.name")
          .optional()
          .isString(),
        // TODO: Should be url
        check("eventHost.group.websiteUrl", "Must be a valid URL.")
          .optional()
          .isURL({
            protocols: ["http", "https"],
            require_tld: true,
            require_protocol: true,
          }),
        // TODO: Should be unique
        check("eventHost.group.email", "Must be a valid email address.")
          .optional()
          .isString(),
        check("eventHost.user.name.firstName")
          .optional()
          .isString(),
        check("eventHost.user.name.lastName")
          .optional()
          .isString(),
        // TODO: Should be unique
        check("eventHost.user.email", "Must be a valid email address.")
          .optional()
          .isEmail(),
        check("joinedHosts")
          .optional()
          .isArray(),
        check("popups")
          .optional()
          .isArray(),
        check("guests")
          .optional()
          .isArray(),
      ];
    }
    case "updateEvent": {
      return [
        check("eventType", "Event type must be a string.")
          .isString()
          .optional(),
        check("eventName", "Event name must be a string.")
          .isString()
          .optional(),
        check("location.address.additionalInfo")
          .isString()
          .optional(),
        check("location.address.streetName", "Street name must be a string.")
          .isString()
          .optional(),
        check("location.address.houseNumber", "House number must be a string.")
          .isString()
          .optional(),
        check("location.address.postCode", "Post code must be a string.")
          .isPostalCode()
          .optional(),
        check("location.address.city", "City must be a string.")
          .isString()
          .optional(),
        check("location.address.country", "Country must be a string.")
          .isString()
          .optional(),
        check("date.week_day", "Week day must be a string.")
          .isString()
          .optional(),
        // TODO: Change to .isISO8601() later
        check("date.start_datetime", "Start date and time must be a date.")
          .isString()
          .optional(),
        // TODO: Change to .isISO8601() later
        check(
          "date.end_datetime",
          "End date and time must be a date.",
        ).optional(),
        // TODO: Check if event host is group or user and apply corresponding properties
        check("eventHost.group.name")
          .optional()
          .isString(),
        // TODO: Should be url
        check("eventHost.group.websiteUrl")
          .optional()
          .isString(),
        // TODO: Should be unique
        check("eventHost.group.email", "Must be a valid email address.")
          .optional()
          .isString(),
        check("eventHost.user.name.firstName")
          .optional()
          .isString(),
        check("eventHost.user.name.lastName")
          .optional()
          .isString(),
        // TODO: Should be unique
        check("eventHost.user.email", "Must be a valid email address.")
          .optional()
          .isEmail(),
        check("joinedHosts", "Joined hosts must be an array of strings.")
          .isArray()
          .optional(),
        check("popups", "Pop-ups must be an array of strings.")
          .isArray()
          .optional(),
        check("guests", "Guests must be an array of strings.")
          .isArray()
          .optional(),
      ];
    }
  }
};
