import express from "express";
import db from "./api/src/db/db_connection.js";

import snippetsRouter from "./api/src/routers/snippets.js";
import tagsRouter from "./api/src/routers/tags.js";

const app = express();
const port = process.env.PORT || 3000;

// Support parsing JSON requests
app.use(express.json());

// connect router
app.use("/api/snippets", snippetsRouter);
app.use("/api/tags", tagsRouter);

app.get("/search", async (req, res) => {
  const { q } = req.query;

  let query = db("snippets");

  if (q) {
    query = query
      .where("title", "like", `%${q}%`)
      .orWhere("contents", "like", `%${q}%`);
  }

  const results = await query;
  res.json(results);
});

app.post("/search", async (req, res) => {
  const { q } = req.query;
  const { fields } = req.body;

  // both provided
  if (q && fields) {
    return res.status(400).json({
      error: "Cannot use both q and fields together",
    });
  }

  let query = db("snippets")
    .leftJoin("snippet_tags", "snippets.id", "snippet_tags.snippet_id")
    .leftJoin("tags", "tags.id", "snippet_tags.tag_id")
    .select(
      "snippets.id",
      "snippets.title",
      "snippets.contents"
    );

  // SEARCH BY TEXT (q)
  if (q) {
    query = query.where(function () {
      this.where("snippets.title", "like", `%${q}%`)
        .orWhere("snippets.contents", "like", `%${q}%`);
    });
  }

  // FILTER BY TAGS
  if (fields?.tags) {
    query = query.where("tags.name", fields.tags);
  }

  const rows = await query;

  // remove duplicates (because JOIN creates duplicates)
  const unique = Array.from(
    new Map(rows.map(r => [r.id, r])).values()
  );

  res.json(unique);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

