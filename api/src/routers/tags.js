import express from "express";
import db from "../db/db_connection.js";

const router = express.Router();

//
// GET /api/tags
//
router.get("/", async (req, res) => {
  const tags = await db("tags").select("*");
  res.json(tags);
});

//
// GET /api/tags/:id
//
router.get("/:id", async (req, res) => {
  const tag = await db("tags")
    .where({ id: req.params.id })
    .first();

  if (!tag) {
    return res.status(404).json({ error: "Tag not found" });
  }

  res.json(tag);
});

//
// POST /api/tags
//
router.post("/", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Missing name" });
  }

  const [id] = await db("tags").insert({
    name: req.body.name,
  });

  res.status(201).json({ id, name: req.body.name });
});

//
// PUT /api/tags/:id
//
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    if (!req.body?.name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const updated = await db("tags")
      .where({ id })
      .update({ name: req.body.name });

    if (!updated) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json({ message: "Tag updated" });

  } catch (err) {
    console.error("PUT /tags error:", err);

    // handle UNIQUE constraint error
    if (err.code === "SQLITE_CONSTRAINT") {
      return res.status(409).json({
        error: "Tag name already exists"
      });
    }

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

//
// DELETE /api/tags/:id
//
router.delete("/:id", async (req, res) => {
  const deleted = await db("tags")
    .where({ id: req.params.id })
    .del();

  if (!deleted) {
    return res.status(404).json({ error: "Tag not found" });
  }

  res.json({ message: "Tag deleted" });
});

export default router;