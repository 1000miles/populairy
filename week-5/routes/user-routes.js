const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator/check");
const userController = require("../controllers/userController");

const EventService = require("../services/event-service");
const PopupService = require("../services/popup-service");
const UserService = require("../services/user-service");

// READ - GET http://localhost:3000/user/all
router.get("/all", async (req, res) => {
  try {
    const users = await UserService.findAll();

    res.render("users", { users });
  } catch (err) {
		res.status(404).send(`Error 404. Users not found.`, err);
  }
});

// READ - GET http://localhost:3000/user/list
router.get("/all/json", async (req, res) => {
  try {
    const users = await UserService.findAll();

		res.status(200).json({
			status: "Success.",
			results: users.length,
			data: users,
		});
    // res.render('userlistJSON', { items: users });
  } catch (err) {
    res.status(404).json({
      status: "404. Users not found.",
      message: err,
    });
  }
});

// READ - GET http://localhost:3000/user/objectId
router.get("/:id", async (req, res) => {
  try {
    const user = await UserService.findById(req.params.id);
    const events = await EventService.findAll(req.params.id);
    const popups = await PopupService.findAll(req.params.id);

		res.render("user", {
			user,
			events,
			popups,
		});
  } catch (err) {
    res.send(`Error while loading user.`, err);
  }
});

// READ - GET http://localhost:3000/user/objectId
router.get("/:id/json", async (req, res) => {
  try {
    const user = await UserService.findById(req.params.id);
    const userEvents = await user.events.map(el => el.eventName);
    const userPopups = await user.popups.map(el => el.popupTitle);

    res.status(200).json({
      status: "Success.",
      data: { user, events: userEvents, popups: userPopups },
    });
  } catch (err) {
    res.status(404).json({
      status: "Error 404. User not found.",
      message: err,
    });
  }
});

// CREATE a new user = POST http://localhost:3000/user/
router.post("/new",
	userController.validate("createUser"),
	async (req, res, next) => {
		try {
			const user = await UserService.add(req.body);

			res.status(201).send(`Success. User created.`, user)

			// Axios
			// res.status(200).json({
			// 	status: "Success. User created.",
			// 	data: user,
			// });
		} catch (err) {
			const errors = validationResult(req);

      // Check for validation errors
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "Error 400. User not created.",
          errors: errors.array(),
        });
			}

		}
	}
);

// UPDATE a single user unit - PATCH http://localhost:3000/user/objectId
router.patch(
  "/:id",
  userController.validate("updateUser"),
  async (req, res, next) => {
    try {
			// Find user by id, retrieve data from req.body with options
			// and return user after update
			const updatedUser = await UserService.findOneAndUpdate(
				req.params.id,
				req.body,
				{
					new: true,
					runValidators: true,
				},
			);

			res.status(200).json({
				status: "Success 200. User updated.",
				data: updatedUser,
			});

    } catch (err) {
			const errors = validationResult(req);

      if (!errors.isEmpty()) {
				return res.status(424).json({
					errors: errors.array(),
					status: "Error 424. User not updated.",
				});
			};
  	};
	},
);

// DELETE a single user DELETE http://localhost:3000/user/objectId
router.delete("/:id", async (req, res) => {
  try {
    // Returns deleted document after deletion
    await UserService.findOneAndDelete(req.params.id);

    res.status(204).json({
      status: "Success. User deleted.",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error 400. User not deleted.",
      message: err,
    });
  }
});

module.exports = router;
