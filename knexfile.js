import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: process.env.DATABASE_URL || "./hyf_node_week1.sqlite3",
    },
    useNullAsDefault: true,
  },
};
