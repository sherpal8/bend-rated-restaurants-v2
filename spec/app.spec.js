const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const client = require("../db/index");

describe("Error 404: unknown end-points", () => {
  it("status 404 if attempt GET from unknown end-point", () => {
    return request(app)
      .get("/hey")
      .expect(404);
  });
  it("message `Page not found` if attempt GET from unknown end-point", () => {
    return request(app)
      .get("/hey")
      .expect(404)
      .then(({ body }) => {
        msg: "Page not found";
      });
  });
});
describe("/api", () => {
  after(() => client.end());
  // End-point: /api/areas
  describe("/areas", () => {
    // GET
    describe("GET()", () => {
      it("status 200 from GET", () => {
        return request(app)
          .get("/api/areas")
          .expect(200);
      });
      it("expect response to have keys of `total_areas` and `areas`", () => {
        return request(app)
          .get("/api/areas")
          .expect(200)
          .then(({ body }) => {
            expect(Object.keys(body)).to.eql(["total_areas", "areas"]);
          });
      });
      it("expect key of `total_areas` to be a number", () => {
        return request(app)
          .get("/api/areas")
          .expect(200)
          .then(({ body }) => {
            expect(typeof body["total_areas"]).to.equal("number");
          });
      });
      it("expect key of `areas` to be an array", () => {
        return request(app)
          .get("/api/areas")
          .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body["areas"])).to.equal(true);
          });
      });
      it("confirm values of keys `total_areas` to be 3 ", () => {
        return request(app)
          .get("/api/areas")
          .expect(200)
          .then(({ body }) => {
            expect(body["total_areas"]).to.equal(3);
          });
      });
      it("confirm length of key `areas` to equal 3", () => {
        return request(app)
          .get("/api/areas")
          .expect(200)
          .then(({ body }) => {
            expect(body["areas"].length).to.equal(3);
          });
      });
    });
    // POST
    describe("POST()", () => {
      it("status 201 from POST", () => {
        return request(app)
          .post("/api/areas")
          .send({ areaname: "Harrogate" })
          .expect(201);
      });
      it("expect response to be a json object containing the new area", () => {
        return request(app)
          .post("/api/areas")
          .send({ areaname: "Harrogate" })
          .expect(201)
          .then(({ body }) => {
            expect(body).to.eql({
              area: {
                area_id: 5,
                areaname: "Harrogate"
              }
            });
          });
      });
      it("expect response json object to contain keys of `areaname` and `area_id` ", () => {
        return request(app)
          .post("/api/areas")
          .send({ areaname: "Harrogate" })
          .expect(201)
          .then(({ body: { area } }) => {
            expect(Object.keys(area)).to.eql(["area_id", "areaname"]);
          });
      });
      it("confirm expected values of `areaname` and `area_id` in response object", () => {
        return request(app)
          .post("/api/areas")
          .send({ areaname: "Harrogate" })
          .expect(201)
          .then(({ body: { area } }) => {
            expect(Object.values(area)).to.eql([7, "Harrogate"]);
          });
      });
      // error handlers
      it("error: 400 `Bad request` if no data posted", () => {
        return request(app)
          .post("/api/areas")
          .send({ areaname: null })
          .expect(400)
          .then(({ error }) => {
            expect(error.status).to.equal(400);
            expect(JSON.parse(error.text)).to.eql({ msg: "Bad request" });
          });
      });
      it("error: 400 `Bad request` if data format is not a string", () => {
        return request(app)
          .post("/api/areas")
          .send({ areaname: 1 })
          .expect(400)
          .then(({ error }) => {
            expect(error.status).to.equal(400);
            expect(JSON.parse(error.text)).to.eql({ msg: "Bad request" });
          });
      });
      it("error: 400 `Bad request` if data is empty string", () => {
        return request(app)
          .post("/api/areas")
          .send({ areaname: "" })
          .expect(400)
          .then(({ error }) => {
            expect(error.status).to.equal(400);
            expect(JSON.parse(error.text)).to.eql({ msg: "Bad request" });
          });
      });
    });
  });
  // End-point: /api/areas/:area_id/restaurants
  describe("/areas/:area_id/restaurants", () => {
    // GET
    describe("GET", () => {
      it("status 200 from GET", () => {
        return request(app)
          .get("/api/areas/1/restaurants")
          .expect(200);
      });
      it("response object should have 4 keys, as below", () => {
        return request(app)
          .get("/api/areas/1/restaurants")
          .expect(200)
          .then(({ body }) => {
            expect(Object.keys(body)).to.eql([
              "area_id",
              "name",
              "total_restaurants",
              "restaurants"
            ]);
          });
      });
      it("response object keys should have values as below", () => {
        return request(app)
          .get("/api/areas/1/restaurants")
          .expect(200)
          .then(({ body }) => {
            expect(Object.values(body)).to.eql([
              "1",
              "Greater Manchester",
              1,
              [
                {
                  restaurant_id: 1,
                  area_id: "1",
                  name: "Greater Manchester",
                  cuisine: "Italian",
                  website: "https://www.zizzi.com"
                }
              ]
            ]);
          });
      });
    });
  });
});
