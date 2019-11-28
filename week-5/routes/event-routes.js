const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator/check");
const eventController = require("../controllers/eventController");

const EventService = require("../services/event-service");
const PopupService = require("../services/popup-service");

// GET http://localhost:3000/event/all
router.get("/all", async (req, res) => {
  try {
    const events = await EventService.findAll();
    const popups = await PopupService.findAll();
    console.log(`[event-routes.js] events`, events);

    res.render("events", { events, popups });
  } catch (err) {
    res.send(`Error while loading all events`);
    console.log(err);
  }
});

// GET http://localhost:3000/event/all/json
router.get("/all/json", async (req, res, next) => {
  try {
    const events = await EventService.findAll();

    // res.render('eventlistJSON', { items: events });

    res.status(200).json({
      status: "Success.",
      result: events.length,
      data: events,
    });
  } catch (err) {
    return next(err);
  }
});

// GET http://localhost:3000/event/ObjectId
router.get("/:id", async (req, res) => {
  try {
    const event = await EventService.findById(req.params.id);
    const location = event.location;

    //	console.log(`[event-routes.js] router.get`, event);

    res.render("event", { event, location });
  } catch (err) {
    res.status(404).send({ msg: `Error. Event does not exist.` });
  }
});

// GET http://localhost:3000/event/ObjectId/json
router.get("/:id/json", async (req, res) => {
  try {
    const event = await EventService.findById(req.params.id);

    res.status(200).json({
      status: "Success.",
      data: event,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error. Event does not exist.",
      message: err,
    });
  }
});

// POST `/event/new` w/ req.body
router.post(
  "/new",
  eventController.validate("createEvent"),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          status: "Error. Event not created.",
          errors: errors.array(),
        });
      }

      const {
        eventType,
        eventName,
        location,
        date,
        eventHost,
        joinedHosts,
        popups,
        guests,
      } = req.body;

      // Create a new event with required and optional values
      const event = await EventService.add({
        eventType,
        eventName,
        location,
        date,
        eventHost,
        joinedHosts,
        popups,
        guests,
      });

      await res.status(200).json({
        status: "Success. Event created.",
        data: event,
      });
    } catch (err) {
      return next(err);
    }
  },
);

/**
 * PATCH `/event/:id` - Use patch over put
 * In combination with `new: true` we prevent empty
 * values for the other properties that haven't been updated
 */

router.patch(
  "/:id",
  eventController.validate("updateEvent"),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
          status: "Error. Event not updated.",
        });
      } else {
        const updatedEvent = await EventService.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          },
        );

        await updatedEvent.save();

        console.log(`updatedEvent`, updatedEvent);

        return res.status(201).json({
          status: "Success. Event updated.",
          data: updatedEvent,
        });
      }
    } catch (err) {
      return next(err);
    }
  },
);

// DELETE `/event/:id` JSON
router.delete("/:id", async (req, res) => {
  try {
    const event = await EventService.deleteOne(req.params.id);
    res.status(201).json({
      status: "Success. Event deleted.",
      data: event,
    });
  } catch (err) {
    res.status(422).json({
      status: "Fail. Event not deleted.",
      message: err,
    });
  }
});

router.post(
  "/popups",
  eventController.validate("updateEvent"),
  async (req, res, next) => {
    try {
      const event = await EventService.findById(req.params.id);
      const popups = await PopupService.findAll();
      const popup = await PopupService.findById(req.params.id);

      if (popup.role) console.log(`popups`, popups);

      event.sendInvitation(popup);
    } catch (err) {
      return next(err);
    }
  },
);

module.exports = router;
