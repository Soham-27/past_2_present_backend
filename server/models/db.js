import pg from "pg";
import dotenv from 'dotenv';
dotenv.config({path:"../config/.env"});
const {Client}=pg;
const string =process.env.STRING||"postgres://india:wFvuADVTXlLtL0AD7ENLfTI26MewuEeN@dpg-co40ibq1hbls73bnlt10-a.oregon-postgres.render.com/past2present";
const db=new pg.Client({
    //  user:"postgres",
    // host:"localhost",
    // database:"past2present",
    // password:"bharat", 
    // port:5432,
    // user:process.env.USER,
    // host:process.env.HOST,
    // database:process.env.DATABASE,
    // password:process.env.PASSWORD,
    // port:process.env.PORT, 
    // host: "dpg-co40ibq1hbls73bnlt10-a",
    // port: 5432, 
    // database: 'past2present', 
    // user: 'india', 
    // password: 'wFvuADVTXlLtL0AD7ENLfTI26MewuEeN', 
    connectionString:string, ssl: {
    rejectUnauthorized: false, // You may need to set this to true if you have a valid certificate
      },
});
try {
    // Connect to the database using the connect method
    db.connect()
        .then(() => {
            console.log("Database connected!!");
        })
        .catch((error) => {
            console.error("Error connecting to the database:", error);
        });
} catch (error) {
    console.log(error);
}

export {db}; 