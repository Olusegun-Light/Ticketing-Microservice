import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { errorhandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-errors";

const app = express();
app.set("trust proxy", true)

app.use(json());

app.use(cookieSession({
  signed: false,
  secure: false //set back to true
}))

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorhandler);

const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error("JWT_KEY must be defined")
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");

    console.log("Connected to mongodb");
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log("::Listening on port 3000::");
  });
};

start();
