const { check, validationResult } = require('express-validator/check');
// const Event = require('../models/with-mongoose/EventNEW');

// Model Schema Validator
exports.validate = method => {
  switch (method) {
    case 'createEvent': {
      return [
        check('eventType', "Event type can't be blank.")
          .exists()
          .isString(),
        check('eventName', "Event name can't be blank.")
          .exists()
          .isString(),
        check('eventHost.group.name')
          .optional({ nullable: true })
          .isString(),
        check('eventHost.user.name')
          .optional({ nullable: true })
          .isString(),
        check('location.address.additionalInfo')
          .optional({ nullable: true })
          .isString(),
        check('location.address.streetName', "Street name can't be blank.")
          .exists()
          .isString(),
        check('location.address.houseNumber', "House number can't be blank.")
          .exists()
          .isString(),
        check('location.address.postCode', "Post code can't be blank.")
          .exists()
          .isPostalCode(),
        check('location.address.city', "City can't be blank.")
          .exists()
          .isString(),
        check('location.address.country', "Country can't be blank.")
          .exists()
          .isString(),
        check('date.week_day.from', "Week day from can't be blank.")
          .exists()
          .isString(),
        check('date.week_day.to', "Week day to can't be blank.")
          .exists()
          .isString(),
        check('date.start_datetime', "Start date and time can't be blank.")
          .exists()
          .isString(),
        check('date.end_datetime', "End date and time can't be blank.")
          .exists()
          .isString(),
        check('joinedHosts')
          .optional({ nullable: true })
          .isArray(),
        check('popups')
          .optional({ nullable: true })
          .isArray(),
        check('guests')
          .optional({ nullable: true })
          .isArray(),
      ];
    }
    case 'updateEvent': {
      return [
        check('eventType', 'Event type must be a string.')
          .isString()
          .optional({ nullable: true }),
        check('eventName', 'Event name must be a string.')
          .isString()
          .optional({ nullable: true }),
        check('eventHost.group.name')
          .isString()
          .optional({ nullable: true }),
        check('eventHost.user.name')
          .isString()
          .optional({ nullable: true }),
        check('location.address.additionalInfo')
          .isString()
          .optional({ nullable: true }),
        check('location.address.streetName', 'Street name must be a string.')
          .isString()
          .optional({ nullable: true }),
        check('location.address.houseNumber', 'House number must be a string.')
          .isString()
          .optional({ nullable: true }),
        check('location.address.postCode', 'Post code must be a string.')
          .isPostalCode()
          .optional({ nullable: true }),
        check('location.address.city', 'City must be a string.')
          .isString()
          .optional({ nullable: true }),
        check('location.address.country', 'Country must be a string.')
          .isString()
          .optional({ nullable: true }),
        check('date.week_day', 'Week day must be a string.')
          .isString()
          .optional({ nullable: true }),
        check('date.start_datetime', 'Start date and time must be a date.')
          .isISO8601()
          .optional({ nullable: true }),
        check('date.end_datetime', 'End date and time must be a date.')
          .isISO8601()
          .optional({ nullable: true }),
        check('joinedHosts', 'Joined hosts must be an array of strings.')
          .isArray()
          .optional({ nullable: true }),
        check('popups', 'Pop-ups must be an array of strings.')
          .isArray()
          .optional({ nullable: true }),
        check('guests', 'Guests must be an array of strings.')
          .isArray()
          .optional({ nullable: true }),
      ];
    }
  }
};
