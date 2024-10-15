import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorhandler, NotFoundError } from "@loticket/common";

import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";

const app = express();
app.set("trust proxy", true);

app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: false, //set back to true
  })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorhandler);

export { app };
