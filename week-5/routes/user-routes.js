const express = require("express");
const router = express.Router();

const EventService = require("../services/event-service");
const PopupService = require("../services/popup-service");
const UserService = require("../services/user-service");

// READ - GET http://localhost:3000/user/all
router.get("/all", async (req, res) => {
  try {
    // console.log(`Start user`)
    const users = await UserService.findAll();
    // console.log(`[user-routes.js] users`, users);
    res.render("users", { users });
  } catch (err) {
    console.log(`ERR while loading all users`, err);
  }
});

// READ - GET http://localhost:3000/user/list
router.get("/all/json", async (req, res) => {
  try {
    const users = await UserService.findAll();

    // res.render('userlistJSON', { items: users });

    // Axios
    res.status(200).json({
      status: "Success.",
      results: users.length,
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail. Users not loaded.",
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
    console.log(`ERR while loading user`, err);
  }
});

// READ - GET http://localhost:3000/user/objectId
router.get("/:id/json", async (req, res) => {
  try {
    const user = await UserService.findById(req.params.id);
    const userEvents = await user.events.map(el => el.eventName);
    const userPopups = await user.popups.map(el => el.popupTitle);

    // Axios
    res.status(200).json({
      status: "Success.",
      data: { user, events: userEvents, popups: userPopups },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail. User not loaded.",
      message: err,
    });
  }
});

// CREATE a new user = POST http://localhost:3000/user/
router.post("/", async (req, res) => {
  try {
    const user = await UserService.add(req.body);

    res.status(201).json({
      status: "Success. User created.",
      data: user,
    });
  } catch (err) {
    res.status(424).json({
      status: "Fail. User not created.",
      message: err,
    });
  }
});

// UPDATE a single user part - PATCH http://localhost:3000/user/objectId
router.patch("/:id", async (req, res) => {
  try {
    const user = await UserService.findById(req.params.id);
    // Find user by id, update data based on retrieved data from user (req.body)
    const updateUser = await UserService.findByIdAndUpdate(user, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: "Success. User updated.",
      data: updateUser,
    });
  } catch (err) {
    res.status(424).json({
      status: "Fail. User not updated.",
      message: err,
    });
  }
});

// UPDATE a single user unit - PATCH http://localhost:3000/user/objectId
router.put("/:id", async (req, res) => {
  try {
    const user = await UserService.findById(req.params.id);
    // Find user by id, update data based on retrieved data from user (req.body)
    const updateUser = await UserService.findByIdAndUpdate(user, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "Success. User updated.",
      data: updateUser,
    });
  } catch (err) {
    res.status(424).json({
      status: "Fail. User not updated.",
      message: err,
    });
  }
});

// DELETE a single user DELETE http://localhost:3000/user/objectId
router.delete("/:id", async (req, res) => {
  try {
    const users = await UserService.findAll(req.params.id);
    const user = await UserService.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "Success. User deleted.",
      results: users.length,
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail. User not deleted.",
      message: err,
    });
  }
});

// CREATE event for single user - CREATE http://localhost:3000/user/objectId/events
router.post("/:id/events", async (req, res) => {
  try {
    const user = await UserService.findAll(req.params.id);
    const event = await EventService.findAll(req.body.event);

    await UserService.attendEvent(user, event);

    console.log(`[user-routes] router.post: Event: ${event}, User: ${user}`);

    // Axios
    res.status(200).json({
      status: "Success. User added to events.",
      data: [user, event],
    });
  } catch (err) {
    res.status(424).json({
      status: "Fail. Event not added to user.",
      message: err,
    });
  }
});

module.exports = router;
