import express, { Router } from "express";
import businessController from "../controllers/business.controller";
import { authenticateToken } from "../middlewares/authenticateToken";
import { authorizeBusinessOwner } from "../middlewares/authorizeOwner";
import { authorizeManager } from "../middlewares/authorizeManager";
const app: Router = express.Router();

app.get("/:id", businessController.getById);
app.get("/", businessController.get);
app.post("/", authenticateToken, authorizeManager, businessController.post);
app.put(
  "/:id",
  authenticateToken,
  authorizeBusinessOwner,
  businessController.put,
);
app.delete(
  "/:id",
  authenticateToken,
  authorizeBusinessOwner,
  businessController.delete,
);

export default app;
