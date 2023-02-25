import express from "express";
import { getStation, getStations, createStation, createReview, createPrice } from "../controllers/stations.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getStations)
router.get("/:stationId", verifyToken, getStation);

/* POST */
router.post("/", verifyToken, createStation);

/* UPDATE */
router.patch("/:stationId/reviews/:userId", verifyToken, createReview);
router.patch("/:stationId/prices/:userId", verifyToken, createPrice);
export default router;