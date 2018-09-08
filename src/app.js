const express = require("express");
const { userService } = require("./services");
const catchException = require("./middlewares/catchException");
const app = express();

app.use(express.json());

app.get(
  "/api/v1/users",
  catchException(async (req, res) => {
    let { offset, limit, fields } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit = Math.min(limit, 50);
    fields = fields ? fields.split(",") : undefined;
    const users = await userService.listUsers(offset, limit, fields);
    res.json(users);
  })
);

app.post(
  "/api/v1/users",
  catchException(async (req, res) => {
    const { firstName, lastName } = req.body;
    const user = await userService.createUser(firstName, lastName);
    res.json(user);
  })
);

app.post(
  "/api/v1/users/:userId/send-email",
  catchException(async (req, res) => {
    //TODO: Send email to user about something
    res.json({ message: "Email sent" });
  })
);

app.get(
  "/api/v1/users/:userId",
  catchException(async (req, res) => {
    const { userId } = req.params;
    let { fields } = req.query;
    fields = fields ? fields.split(",") : undefined;
    const user = await userService.getUser(userId, fields);
    res.json(user);
  })
);

app.put(
  "/api/v1/users/:userId",
  catchException(async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName } = req.body;
    const user = await userService.updateUser(userId, firstName, lastName);
    res.json(user);
  })
);

app.delete(
  "/api/v1/users/:userId",
  catchException(async (req, res) => {
    const { userId } = req.params;
    const user = await userService.deleteUser(userId);
    res.json(user);
  })
);

app.use((error, req, res, next) => {
  res.json({ message: error.message });
});

module.exports = app;
