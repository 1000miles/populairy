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
    // console.log(`[event-routes.js] events`, events);

    res.render("events", { events, popups });
  } catch (err) {
    res.status(404).send(`Error 404. Events not found.`, err);
    // console.log(err);
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
		res.status(404).json({
      status: "Error 404. Events not found.",
      message: err,
    });
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
    res.status(404).send(`Error 404. Event not found.`, err);
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
      status: "Error 404. Event not found.",
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

			const event = await EventService.add(req.body);

			res.send(event);

			// Axios
      // res.status(200).json({
      //   status: "Success. Event created.",
      //   data: event,
      // });
    } catch (err) {
			const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "Error 400. Event not created.",
          errors: errors.array(),
        });
			}

    }
  },
);

/**
 * PATCH `/event/:id` - Update event
 * Use patch over put in combination with `new: true` we
 * prevent empty values for the other properties that
 * haven't been updated
 */

router.patch(
  "/:id",
  eventController.validate("updateEvent"),
  async (req, res, next) => {
    try {
			const updatedEvent = await EventService.findOneAndUpdate(
				req.params.id,
				req.body,
				{
					new: true,
					runValidators: true,
				},
			);

			res.send(updatedEvent)

			// console.log(`updatedEvent`, updatedEvent);

			// res.status(200).json({
			// 	status: "Success 200. Event updated.",
			// 	data: updatedEvent,
    } catch (err) {
			const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(424).json({
          errors: errors.array(),
          status: "Error 424. Event not updated.",
				});
			}
    }
  },
);

// DELETE `/event/:id` JSON
router.delete("/:id", async (req, res) => {
  try {
    await EventService.findOneAndDelete(req.params.id);
		// Use 200 (insteadd of 204 - No content) to return successful deletion message
    res.status(200).json({
      status: "SUCCESS. Event deleted.",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error 400. Event not deleted.",
      message: err,
    });
  }
});

module.exports = router;
