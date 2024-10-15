import request from "supertest";

import { app } from "../../app";

it("fails when a email that does no exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});
