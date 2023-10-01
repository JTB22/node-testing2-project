const express = require("express");
const model = require("./db-model.js");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello, world!");
});

//get all rooms
server.get("/rooms", async (req, res, next) => {
  const rooms = await model.getAllRooms();
  if (!rooms) {
    next();
  } else {
    res.status(200).json(rooms);
  }
});

//get all vacant rooms
server.get("/rooms/vacant", async (req, res, next) => {
  const rooms = await model.getAllVacantRooms();
  if (!rooms) {
    next();
  } else {
    res.status(200).json(rooms);
  }
});

//get a specific room
server.get("/rooms/:id", async (req, res, next) => {
  const room = await model.getRoom(req.params.id);
  if (!room) {
    next();
  } else {
    res.status(200).json(room);
  }
});

//create a room
server.post("/rooms", async (req, res, next) => {
  const room = await model.createRoom(req.body);
  if (!room) {
    next();
  } else {
    res.status(200).json(room);
  }
});

//room checkin
server.get("/rooms/:id/checkin", async (req, res, next) => {
  const room = await model.roomVacancy(req.params.id, false);
  if (!room) {
    next();
  } else {
    res.status(200).json(room);
  }
});

//room checkout
server.get("/rooms/:id/checkout", async (req, res, next) => {
  const room = await model.roomVacancy(req.params.id, true);
  if (!room) {
    next();
  } else {
    res.status(200).json(room);
  }
});

server.use((err, req, res, next) => {
  res.status(500).json(err.message);
});

module.exports = server;
