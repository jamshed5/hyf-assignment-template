import jwt from "jsonwebtoken";
import db from "../db/db_connection.js";

// authJwt = Stateless authentication (JWT-based)
export function authJwt(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "No token" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// authToken = Stateful session/token lookup (DB-based)
export async function authToken(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ error: "Missing token" });
    }

    const token = header.split(" ")[1];

    const record = await db("auth_tokens").where({ token }).first();

    if (!record) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await db("users").where({ id: record.user_id }).first();
    // whole object for testing (debugging)
    console.log(user);

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({ error: "Auth error" });
  }
}



