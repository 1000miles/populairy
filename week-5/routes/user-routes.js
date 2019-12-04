const express = require("express");
const router = express.Router();

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
    return res.status(404).json({
      status: "Error 404. Users not found.",
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
    res.status(404).send(err);
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
      errors: err,
    });
  }
});

// CREATE a new user = POST http://localhost:3000/user/
router.post("/new", async (req, res, next) => {
  try {
    const user = await UserService.add(req.body);

    res.send(user);
  } catch (err) {
    return res.status(400).json({
      status: "Error 400. User not created.",
      errors: err,
    });
  }
});

// UPDATE a single user unit - PATCH http://localhost:3000/user/objectId
router.patch("/:id", async (req, res, next) => {
  try {
    // Find user by id, retrieve data from req.body with options and return user after update
    const updatedUser = await UserService.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.send(updatedUser);
  } catch (err) {
    return res.status(404).json({
      status: "Error 404. User not found.",
      errors: err,
    });
  }
});

// DELETE a single user DELETE http://localhost:3000/user/objectId
router.delete("/:id", async (req, res) => {
  try {
    // Returns deleted document after deletion
    await UserService.findOneAndDelete(req.params.id);

    if (req.params.id)
      res.status(200).json({
        // Use 200 (insteadd of 204 - No content) to return successful deletion message
        status: "Success. User deleted.",
        data: null,
      });
  } catch (err) {
    return res.status(404).json({
      status: "Error 404. User not deleted.",
      errors: err,
    });
  }
});

router.post("/:id/events", async (req, res) => {
  try {
    const user = await UserService.findById(req.params.id);
    const event = await EventService.findById(req.body.event);

    console.log(`[user-routes.js] POST EVENT`, event);

    user.attend(user, event);
    res.send(user);
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
});

router.post("/:id/popups", async (req, res) => {
  try {
    const user = await UserService.findById(req.params.id);
    const popup = await PopupService.findById(req.body.popup);

    user.visit(user, popup);
    res.send(user);
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
});

module.exports = router;
