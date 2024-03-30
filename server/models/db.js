import pg from "pg";
const {Client}=pg;
const db=new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"past2present",
    password:"bharat",
    port:5432,
    // user:process.env.USER,
    // host:process.env.HOST,
    // database:process.env.DATABASE,
    // password:process.env.PASSWORD,
    // port:process.env.PORT,  
});
if(db .connect()){  
    console.log("database connected!!")
}
else{
    console.log("error in the connecting database");
}
export {db}; 