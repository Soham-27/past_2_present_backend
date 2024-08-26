import pg from "pg";
import dotenv from 'dotenv';
dotenv.config();
const {Client}=pg;
//const string =process.env.STRING||"postgres://india:wFvuADVTXlLtL0AD7ENLfTI26MewuEeN@dpg-co40ibq1hbls73bnlt10-a.oregon-postgres.render.com/past2present";
const db=new pg.Client({
    user:process.env.USER||"default",
    host:process.env.HOST||"ep-small-hall-a1yif4qi-pooler.ap-southeast-1.aws.neon.tech",
    database:process.env.DATABASE||"verceldb",
    password:process.env.PASSWORD||"8ThvLar1fYpR",
    ssl: {
    rejectUnauthorized: false, // You may need to set this to true if you have a valid certificate
      },
});
try {
    // Connect to the database using the connect method
    db.connect()
        .then(() => {
            console.log("Database connected!!!");
        })
        .catch((error) => {
            console.error("Error connecting to the database:", error);
        }); 
} catch (error) { 
    console.log(error);  
} 
// const create_table_query=
//     "create table items(item_id serial primary key,item_name text,price float,years_used float,item_message text,fk_user_id int,uploaded_at Date,constraint fk_user_id FOREIGN KEY(fk_user_id) references users(user_id) ON DELETE CASCADE ON UPDATE CASCADE);"
// db.query(create_table_query, (err, res) => {
//     if (err) {
//         console.error('Error creating table:', err);
//     } else {
//         console.log('Table created successfully');
//     }
//     db.end();
// }); 
// const read_query="select * from user_token";
// const result=await db.query(read_query);
// console.log(result.rows);
// const read_query_1="select * from items";
// const result_1=await db.query(read_query_1);
// console.log(result_1.rows);
 


export {db}; 