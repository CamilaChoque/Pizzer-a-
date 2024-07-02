//importarmos modulo mysql2
const mysql = require("mysql2");

//conexion con la DB
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "juny890kuyL-", //poner su password personal
    port: 3306,
    database:"mydb"
})

//conexion
connection.connect((err)=>{
    //en caso de erro
    if(err){
        console.log("Error de conexión con el servidor: "+err);
        return;
    }

    //Caso afirmativi
    console.log("Estado de conexion: conectado")

    //Creacion de consulta
    const sqlCreateDB = 'CREATE DATABASE IF NOT EXISTS mydb';

    //pasamos consulta-en caso de que l DB no exista
    connection.query(sqlCreateDB,(err,results)=>{
        //caso error
        if(err){
            console.log("Error de conexión con el servidor: "+err);
            return;
        }
        //caso exitoso
        console.log("BD: creada/existente");
        
        //tabla
        connection.changeUser({database: "mydb"}, (err)=>{
            //caso error
            if(err){
                console.log("Error al cambiar a la BD Pizzeria: "+err);
                return;
            }   

            //generamos la consulta para crear la tabla
            const createTableQuery=
            "CREATE TABLE IF NOT EXISTS products(id INT AUTO_INCREMENT PRiMARY KEY, name VARCHAR(255) NOT NULL);"

            //pasamos la consulta
            connection.query(createTableQuery,(err,results)=>{
                //caso error
                if(err){
                    console.log("Error al crear la tabla: "+err);
                    return;
                }
                console.log("Tabla: creada/existente")

            })
        }) 
        
    })


})

//exportacion del modulo
module.exports=connection;

