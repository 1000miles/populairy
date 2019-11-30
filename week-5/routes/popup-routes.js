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
    res.send(`Error while loading all pop-ups`);
    console.log(err);
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
		res.status(400).json({
			status: "400. Bad request.",
			message: err,
		});
    return next(err);
  }
  // res.render("popuplistJSON", { items: popups });
});

// GET http://localhost:3000/popup/:id
router.get("/:id", async (req, res, next) => {
	try {
		const popup = await PopupService.findById(req.params.id);

		if (!popup) {
			throw "404. Pop-up does not exist."
		} else {
			res.render("popup", { popup })
		}
  } catch (err) {
		res.send(err);
  }
});

// GET http://localhost:3000/popup/:id/json
router.get("/:id/json", async (req, res, next) => {
	try {
		const popup = await PopupService.findById(req.params.id);

		if (!popup) {
			throw "404. Pop-up does not exist."
		} else {
			res.status(200).json({
				status: "Success",
				data: popup,
			});
		}
  } catch (err) {
		res.send(err);
  }
});

// POST http://localhost:3000/popup
router.post("/new",
	popupController.validate("createPopup"),
	async (req, res, next) => {
		try {
			const errors = validationResult(req);

			// Check for validation errors
			if (!errors.isEmpty()) {
				return res.status(422).json({
					status: "Error while validating.",
					errors: errors.array(),
				});
			};

			const {
				category,
				popupTitle,
				description,
				slots,
				popupOrganizer,
				joinedOrganizers,
				guests
			} = req.body;

			const popup = await PopupService.add({
				category,
				popupTitle,
				description,
				slots,
				popupOrganizer,
				joinedOrganizers,
				guests
			});

			console.log(`POPUP`, popup)

			await res.status(200).json({
				status: "Success. Pop-up created.",
				data: popup,
			});
		} catch (err) {
			return next(err);
		}
	}
);

// UPDATE http://localhost:3000/popup/ObjectId
router.patch("/:id",
  popupController.validate("updatePopup"),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
          status: "Error while validating.",
        });
      } else {
        const updatedPopup = await PopupService.findByIdAndUpdate(
					req.params.id,
					req.body,
					{ new: true },
					(err) => {
						if(err) return handleError(err);
						return res.status(201).json({
							status: "Success. Popup updated.",
							data: updatedPopup,
						});
					}
        );

        await updatedPopup.save((err) => {
					if (err) return handleError(err);
					return res.status(201).json({
						status: "Success. Popup updated.",
						data: updatedPopup,
					});
				});

        console.log(`updatedPopup`, updatedPopup);
      }
    } catch (err) {
      return next(err);
    }
  },
);

// DELETE http://localhost:3000/popup/ObjectId
router.delete("/:id", async (req, res) => {
	try {
		const popup = await PopupService.deleteOne(req.params.id);

		res.status(201).json({
			status: "Success. Pop-up deleted.",
			data: popup,
		})
	} catch (err) {
    res.status(422).json({
      status: "Fail. Pop-up not deleted.",
      message: err,
    });
  }

});

module.exports = router;
