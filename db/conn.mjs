import { Sequelize } from "sequelize";

export const conn = new Sequelize('escola', 'root', '',{
    host: 'localhost' ,
    dialect: 'mysql',
})

try{ 
    conn.authenticate();
    console.log('conectado ao banco');

} catch (error){
    console.log(error);
}