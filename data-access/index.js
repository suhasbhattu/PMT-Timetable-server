import pgPromise from "pg-promise";
import dotenv from "dotenv";

const pgp = pgPromise();
dotenv.config();

const connection = {
  host: "localhost",
  port: 5432,
  database: "pmt_timetable",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

const db = pgp(connection);

export default db;
