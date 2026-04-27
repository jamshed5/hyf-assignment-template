import express from "express";
import db from "../db/db_connection.js";

const router = express.Router();

//
// GET /api/snippets
//
router.get("/", async (req, res) => {
  try {
    const data = await db("snippets").select("*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//
// GET /api/snippets/:id
//
router.get("/:id", async (req, res) => {
  try {
    const snippet = await db("snippets")
      .where({ id: req.params.id })
      .first();

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.status(200).json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//
// POST /api/snippets
//
router.post("/", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);
    const { title, contents, user_id } = req.body;

    if (!title || !contents || !user_id) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const [id] = await db("snippets").insert({
      title,
      contents,
      user_id,
    });

    res.status(201).json({
      id,
      title,
      contents,
      user_id,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//
// PUT /api/snippets/:id
//
router.put("/:id", async (req, res) => {
  try {
    const existing = await db("snippets")
      .where({ id: req.params.id })
      .first();

    if (!existing) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    await db("snippets")
      .where({ id: req.params.id })
      .update(req.body);

    const updatedSnippet = await db("snippets")
      .where({ id: req.params.id })
      .first();

    res.status(200).json(updatedSnippet);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//
// DELETE /api/snippets/:id
//
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await db("snippets")
      .where({ id: req.params.id })
      .del();

    if (!deleted) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.status(200).json({ message: "Snippet deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;