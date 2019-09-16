const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const client = require("../db/index");

describe("/api", () => {
  after(() => client.end());
  describe("/areas", () => {
    // GET
    describe("GET()", () => {
      it("status:200 from GET", () => {
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
    describe("POST()", () => {});
  });
});
