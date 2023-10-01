const db = require("../data/dbConfig.js");

function getAllRooms() {
  return db("rooms").orderBy("floor", "asc");
}

function getAllVacantRooms() {
  return db("rooms").where({ vacant: true }).orderBy("floor", "asc");
}

function getRoom(id) {
  return db("rooms").where({ id }).first();
}
function createRoom(room) {
  return db("rooms")
    .insert(room)
    .then((ids) => {
      return getRoom(ids[0]);
    });
}

function roomVacancy(id, status) {
  return db("rooms").where({ id: id }).update({ vacant: status });
}

function changePin(id, pin) {
  return db("rooms").where({ id }).update({ pin });
}

module.exports = {
  getAllRooms,
  getAllVacantRooms,
  getRoom,
  createRoom,
  roomVacancy,
  changePin,
};
