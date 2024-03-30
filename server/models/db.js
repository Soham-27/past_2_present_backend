import pg from "pg";
const {Client}=pg;
const db=new pg.Client({
    user:"postgres"||process.env.USER,
    host:"localhost"||process.env.HOST,
    database:"past2present"||process.env.DATABASE,
    password:"bharat"||process.env.PASSWORD,
    port:5432||process.env.PORT,
});
if(db .connect()){
    console.log("database connected!!")
}
else{
    console.log("error in the connecting database");
}
export {db};  