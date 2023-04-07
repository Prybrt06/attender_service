import express from "express";
import { singin } from "./handlers/signIn";
import { createUser } from "./handlers/signUp";
import { protect } from "./modules/auth";
import { router } from "./router";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/subject",protect, router);


app.post("/signup", createUser);
app.post("/signin", singin);
