import express from "express";
import db from "../db/db_connection.js";

const router = express.Router();

//
// GET /api/tags
//
router.get("/", async (req, res) => {
//   const tags = await db("tags").select("*");
//   res.json(tags);
    res.json({"user":"all users"})
});



export default router;