import db from "../db/db_connection.js";
import bcrypt from "bcrypt";

function formatDateTime(date) {
  const pad = (n) => String(n).padStart(2, "0");

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    " " +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds())
  );
}

async function seedData() {
  try {
    console.log("Seeding dummy user...");

    const password = await bcrypt.hash("123456", 10);

    const existing = await db("users")
      .where({ email: "jaasol.ali@gmail.com" })
      .first();

    if (!existing) {
      await db("users").insert([
        {
          first_name: "Jamshed",
          last_name: "Ali",
          email: "jaasol.ali@gmail.com",
          password,
          confirmed_at: formatDateTime(new Date()),
        },
      ]);

      console.log("Dummy user created");
    } else {
      console.log("Dummy user already exists");
    }
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await db.destroy();
    process.exit();
  }
}

seedData();