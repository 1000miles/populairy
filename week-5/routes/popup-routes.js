const express = require("express");
const router = express.Router();

const EventService = require("../services/event-service");
const PopupService = require("../services/popup-service");
const UserService = require("../services/user-service");

// GET http://localhost:3000/popup/all
router.get("/all", async (req, res) => {
  try {
    const popups = await PopupService.findAll();
    const events = await EventService.findAll();
    const users = await UserService.findAll();

    res.render("popups", {
      popups,
      events,
      users,
    });
  } catch (err) {
    res.status(404).send(`Error 404. Pop-ups not found.`, err);
  }
});

// GET http://localhost:3000/popup/all/json
router.get("/all/json", async (req, res) => {
  try {
    const popups = await PopupService.findAll();

    res.status(200).json({
      status: "Success.",
      result: popups.length,
      data: popups,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Error 404. Pop-ups not found.",
      message: err,
    });
  }
  // res.render("popuplistJSON", { items: popups });
});

// GET http://localhost:3000/popup/:id
router.get("/:id", async (req, res, next) => {
  try {
    const popup = await PopupService.findById(req.params.id);

    res.render("popup", { popup });
  } catch (err) {
    res.status(404).send(err);
  }
});

// GET http://localhost:3000/popup/:id/json
router.get("/:id/json", async (req, res, next) => {
  try {
    const popup = await PopupService.findById(req.params.id);

    res.status(200).json({
      status: "Success",
      data: popup,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error 404. Pop-up not found.",
      errors: err,
    });
  }
});

// POST http://localhost:3000/popup
router.post("/new", async (req, res, next) => {
  try {
    const popup = await PopupService.add(req.body);

    res.send(popup);
  } catch (err) {
    return res.status(400).json({
      status: "Error 400. Pop-up not created.",
      errors: err,
    });
  }
});

// UPDATE http://localhost:3000/popup/ObjectId
router.patch("/:id", async (req, res, next) => {
  try {
    const updatedPopup = await PopupService.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).send(updatedPopup);
  } catch (err) {
    return res.status(404).json({
      status: "Error 404. Pop-up not found.",
      errors: err,
    });
  }
});

// DELETE http://localhost:3000/popup/ObjectId
router.delete("/:id", async (req, res) => {
  try {
    await PopupService.findOneAndDelete(req.params.id);

    if (req.params.id)
      res.status(200).json({
        // Use 200 (insteadd of 204 - No content) to return successful deletion message
        status: "Success. Pop-up deleted.",
        data: null,
      });
  } catch (err) {
    return res.status(404).json({
      status: "Error 404. Pop-up not found.",
      errors: err,
    });
  }
});

// Register for an event
router.post("/:id/events", async (req, res) => {
	try {
		const popup = await PopupService.findById(req.params.id)
		const event = await EventService.findById(req.body.event);

		popup.register(event, popup);
		res.send(popup);
	} catch (err) {
		res.status(400).json({
			errors: err
		})
	}
})

module.exports = router;
