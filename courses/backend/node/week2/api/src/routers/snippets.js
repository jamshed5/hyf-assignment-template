import express from "express";
import db from "../db/db_connection.js";
import { snippetSchema } from "../schemas/snippetSchema.js";

const router = express.Router();


// 
// PART A – SQL INJECTION DEMONSTRATION & FIX
// =======================
//
// Vulnerable implementation (OLD):
// query = query.orderByRaw(orderBy);
//
// Problem:
// User input from req.query.sort was directly injected into SQL,
// allowing attackers to manipulate the query.
//
// -----------------------
// Example malicious requests:
//
// 1. /api/snippets?sort=created_at desc; DROP TABLE users;
//
// Generated SQL:
// select * from "snippets" order by created_at desc; DROP TABLE users;
//
// This could delete the users table.
//
// 2. /api/snippets?sort=1 OR 1=1
//
// Generated SQL:
// select * from "snippets" order by 1 OR 1=1;
//
// This injects logic into the query and breaks expected behavior.
//
// -----------------------
// Why this is dangerous:
// - User input becomes executable SQL
// - Can modify queries
// - Can expose or destroy data
//
// -----------------------
// FIX IMPLEMENTED:
//
// 1. Removed orderByRaw()
// 2. Added whitelist validation:
//    - allowedColumns: created_at, title
//    - allowedDirections: asc, desc
// 3. Used safe Knex method:
//    query.orderBy(column, direction);
//
// -----------------------
// Result:
// - User input can no longer change SQL structure
// - Malicious inputs are rejected
// - SQL injection vulnerability is eliminated
//


// 
// GET ALL (SAFE SORTING)
// 
router.get("/", async (req, res) => {
  try {
    let query = db("snippets").select("*");

    const allowedColumns = ["created_at", "title"];
    const allowedDirections = ["asc", "desc"];

    let column = "created_at";
    let direction = "desc";

    if (req.query.sort) {
      const parts = req.query.sort.toString().split(" ");

      if (parts.length !== 2) {
        return res.status(400).json({
          error: "Invalid sort format. Use: column asc|desc",
        });
      }

      const [col, dir] = parts;

      if (!allowedColumns.includes(col) || !allowedDirections.includes(dir.toLowerCase())) {
        return res.status(400).json({
          error: "Invalid sort values",
        });
      }

      // Only allow safe, predefined values (prevents SQL injection)
      column = col;
      direction = dir.toLowerCase();
    }

    const data = await query.orderBy(column, direction);

    return res.status(200).json({ data });
  } catch (err) {
    console.error("GET /snippets error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});


//
// SEARCH
//
// GET /api/snippets/search?q=sql
//
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q?.toString().trim();

    if (!q) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    const data = await db("snippets")
      .select("*")
      .whereILike("title", `%${q}%`)
      .orWhereILike("contents", `%${q}%`);

    return res.status(200).json({ data });
  } catch (err) {
    console.error("SEARCH error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});


// 
// PUBLIC FEED
//
// GET /api/snippets/public
//
router.get("/public", async (req, res) => {
  try {
    const data = await db("snippets")
      .select("*")
      .where({ is_private: false })
      .orderBy("created_at", "desc");

    return res.status(200).json({ data });
  } catch (err) {
    console.error("PUBLIC error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});


//
// GET BY ID
// 
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid ID format",
      });
    }

    const snippet = await db("snippets").where({ id }).first();

    if (!snippet) {
      return res.status(404).json({
        error: "Snippet not found",
      });
    }

    return res.status(200).json({ data: snippet });
  } catch (err) {
    console.error("GET BY ID error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});


// 
// CREATE (ZOD VALIDATION)
// 
router.post("/", async (req, res) => {
  try {
    const parsed = snippetSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        fields: parsed.error.flatten().fieldErrors,
      });
    }

    const { title, contents, user_id } = parsed.data;

    const [id] = await db("snippets").insert({
      title,
      contents,
      user_id,
    });

    return res.status(201).json({
      data: { id, title, contents, user_id },
    });
  } catch (err) {
    console.error("POST error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});


// 
// UPDATE
// 
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid ID format",
      });
    }

    const existing = await db("snippets").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: "Snippet not found",
      });
    }

    await db("snippets").where({ id }).update(req.body);

    const updated = await db("snippets").where({ id }).first();

    return res.status(200).json({ data: updated });
  } catch (err) {
    console.error("PUT error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});


// 
// DELETE
// 
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid ID format",
      });
    }

    const deleted = await db("snippets").where({ id }).del();

    if (!deleted) {
      return res.status(404).json({
        error: "Snippet not found",
      });
    }

    return res.status(200).json({
      message: "Snippet deleted",
    });
  } catch (err) {
    console.error("DELETE error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;