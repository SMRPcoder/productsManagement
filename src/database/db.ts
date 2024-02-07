import { Sequelize } from "sequelize";

const db=new Sequelize("postgres","postgres","root",{
    dialect:"postgres",
    host:"localhost",
    logging:false
});

(async()=>{
    try {
        await db.authenticate();
        console.log("Connection establized successfully");
    } catch (error) {
        console.error(error);
    }
})()

export default db;