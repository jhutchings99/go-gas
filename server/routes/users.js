import express from "express";
import { getUser, addRemoveFavorite } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", getUser);

/* UPDATE */
router.patch("/:id/favorites/:stationId", addRemoveFavorite);

export default router;