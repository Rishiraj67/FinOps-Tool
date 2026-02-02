import connect_db from './app/config/db.js';
import dotenv from "dotenv";
import app from "./app/app.js";

dotenv.config();

connect_db().then(() => {
    app.listen(process.env.PORT || 8000,() => {
        console.log(`Server is running at port: ${process.env.PORT} ✅`);
    });
    app.on("Error",(error)=>{
        console.log(error)
    })
}).catch((err)=>{
    console.log("Connection Failed:",err);
})

