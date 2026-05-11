import express from "express";
import db from "../db/db_connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { authToken } from "../middleware/authJwt.js";

const router = express.Router();

// login-token
router.post("/login-token", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db("users").where({ email }).first();

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    // insertion
    await db("auth_tokens").insert({
      user_id: user.id,
      token,
      expires_at: null,
    });

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db("users").where({ email }).first();

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// logout-token (delete token from db)
router.post("/logout-token", authToken, async (req, res) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(400).json({ error: "Invalid authorization header" });
    }

    const token = header.split(" ")[1];

    // Delete token from DB (invalidate session)
    const deleted = await db("auth_tokens")
      .where({ token })
      .del();

    if (!deleted) {
      return res.status(404).json({ error: "Token not found or already logged out" });
    }

    return res.status(200).json({
      message: "Logged out successfully",
    });

  } catch (err) {
    console.error("LOGOUT error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;


// Note: system support both
// authJwt = Stateless authentication (JWT-based)
// authToken = Stateful session/token lookup (DB-based)