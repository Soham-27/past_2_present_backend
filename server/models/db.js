import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Client({
    user: process.env.USER || "default",
    host: process.env.HOST || "ep-small-hall-a1yif4qi-pooler.ap-southeast-1.aws.neon.tech",
    database: process.env.DATABASE || "verceldb",
    password: process.env.PASSWORD || "8ThvLar1fYpR",
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function connectToDatabase() {
    try {
        await db.connect();
        console.log("Database connected!!!");

        // Uncomment and use these queries as needed
        // const create_table_query = "create table items ...";
        // await db.query(create_table_query);
        // console.log('Table created successfully');

        // const result = await db.query("SELECT * FROM user_token");
        // console.log(result.rows);

        // const result_1 = await db.query("SELECT * FROM items");
        // console.log(result_1.rows);

    } catch (error) {
        console.error("Error connecting to the database:", error);
    } finally {
        await db.end(); // Ensure the connection is closed after operations
    }
}

connectToDatabase();

export { db };
