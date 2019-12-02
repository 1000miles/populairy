const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator/check");
const popupController = require("../controllers/popupController");

const EventService = require("../services/event-service");
const PopupService = require("../services/popup-service");
const UserService = require("../services/user-service");

// GET http://localhost:3000/popup/all
router.get("/all", async (req, res) => {
  try {
    const popups = await PopupService.findAll();
    const events = await EventService.findAll();
    const users = await UserService.findAll();

    // console.log(`POPUP`, popups)

    res.render("popups", {
      popups,
      events,
      users,
    });
  } catch (err) {
		res.status(404).send(`Error 404. Pop-ups not found.`, err);
    // console.log(err);
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
    res.status(404).json({
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
    res.send(`Error while loading pop-up.`, err);
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
      message: err,
    });
  }
});

// POST http://localhost:3000/popup
router.post(
  "/new",
  popupController.validate("createPopup"),
  async (req, res, next) => {
    try {
      const popup = await PopupService.add(req.body);

			// console.log(`POPUP`, popup);

			res.status(201).send(`Success. Pop-up created`, popup)

			// Axios
      // res.status(200).json({
      //   status: "Success. Pop-up created.",
      //   data: popup,
      // });
    } catch (err) {
			const errors = validationResult(req);

      // Check for validation errors
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "Error 400. Pop-up not created.",
          errors: errors.array(),
        });
			}
    }
  },
);

// UPDATE http://localhost:3000/popup/ObjectId
router.patch(
  "/:id",
  popupController.validate("updatePopup"),
  async (req, res, next) => {
    try {
			const updatedPopup = await PopupService.findOneAndUpdate(
				req.params.id,
				req.body,
				{ new: true },
			);

			// console.log(`updatedPopup`, updatedPopup);

			res.status(200).json({
				status: "Success 200. Pop-up updated.",
				data: updatedPopup,
			});
    } catch (err) {
			const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(424).json({
          errors: errors.array(),
          status: "Error 424. Pop-up not updated.",
        });
			};
    };
  },
);

// DELETE http://localhost:3000/popup/ObjectId
router.delete("/:id", async (req, res) => {
  try {
    await PopupService.findOneAndDelete(req.params.id);

    res.status(204).json({
      status: "Success. Pop-up deleted.",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error 400. Pop-up not deleted.",
      message: err,
    });
  }
});

module.exports = router;
