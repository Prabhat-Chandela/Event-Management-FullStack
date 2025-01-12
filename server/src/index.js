import {app} from "./app.js";
import { connectDb } from "./db/index.js";


connectDb()
.then(()=>{
    try {
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server running on port : ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("Server Failure", error);
    }
})
.catch((error)=>{
    console.log("Mongo Db connection failed !!!", error);
})

