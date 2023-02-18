import express from "express";
import { getStation, getStations, createStation, createReview } from "../controllers/stations.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getStations)
router.get("/:stationId", getStation);

/* POST */
router.post("/", createStation);

/* UPDATE */
router.patch("/:stationId/reviews/:userId", verifyToken, createReview);

export default router;