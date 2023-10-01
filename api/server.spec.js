const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require("../api/server");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

const room = {
  floor: 1,
  beds: 1,
  vacant: true,
  pin: 155556,
};

describe("Life Check", () => {
  test("check environment", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
  test("GET / responds with 200", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
  });
});

describe("GET /rooms", () => {
  test("GET /rooms responds with 200", async () => {
    const response = await request(server).get("/rooms");
    expect(response.status).toBe(200);
  });
  test("GET /rooms responds with an array", async () => {
    const response = await request(server).get("/rooms");
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /rooms/vacant", () => {
  test("GET /rooms/vacant responds with 200", async () => {
    const response = await request(server).get("/rooms/vacant");
    expect(response.status).toBe(200);
  });
  test("GET /rooms/vacant responds with an array", async () => {
    const response = await request(server).get("/rooms/vacant");
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /rooms/:id", () => {
  test("GET /rooms/:id responds with 200", async () => {
    const response = await request(server).get("/rooms/1");
    expect(response.status).toBe(200);
  });
  test("GET /rooms/:id responds with an object", async () => {
    const response = await request(server).get("/rooms/1");
    expect(typeof response.body).toBe("object");
  });
});

describe("POST /rooms", () => {
  test("POST /rooms responds with 200", async () => {
    const response = await request(server).post("/rooms").send(room);
    expect(response.status).toBe(200);
  });
  test("POST then GET /rooms shows the new room", async () => {
    const response = await request(server).post("/rooms").send(room);
    const rooms = await request(server).get("/rooms");
    expect(rooms.body).toHaveLength(7);
  });
});
