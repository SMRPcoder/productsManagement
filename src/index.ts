import express,{Express,json} from "express";
import AuthRouter from "./router/auth-router";
import db from "./database/db";
import UserRouter from "./router/user-router";
import AdminRouter from "./router/admin-router";

const app:Express=express();
app.use(json());

// ---- adding routes as middleware------------//
app.use("/api/auth",AuthRouter);
app.use("/api/user",UserRouter);
app.use("/api/admin",AdminRouter);


const port:number=3000;

app.get("/",(req,res)=>{
    res.send("Hello World");
});

db.sync({alter:true}).then(()=>{
    console.log("synced Db");
}).catch(err=>{
    console.log(err);
})

app.listen(port,()=>{
    console.log(`Server Started Listening On ${port}`);
})