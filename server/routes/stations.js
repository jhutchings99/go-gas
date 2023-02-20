import express from "express";
import { getStation, getStations, createStation, createReview, createPrice } from "../controllers/stations.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getStations)
router.get("/:stationId", getStation);

/* POST */
router.post("/", createStation);

/* UPDATE */
router.patch("/:stationId/reviews/:userId", createReview);
router.patch("/:stationId/prices/:userId", createPrice);
export default router;