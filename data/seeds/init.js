/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("rooms").del();
  await knex("rooms").insert([
    { id: 1, floor: 1, beds: 1, vacant: true, pin: 123456 },
    { id: 2, floor: 1, beds: 2, vacant: false, pin: 654321 },
    { id: 3, floor: 2, beds: 2, vacant: false, pin: 987654 },
    { id: 4, floor: 2, beds: 1, vacant: true, pin: 111111 },
    { id: 5, floor: 3, beds: 1, vacant: true, pin: 222222 },
    { id: 6, floor: 3, beds: 2, vacant: false, pin: 333333 },
  ]);
};
