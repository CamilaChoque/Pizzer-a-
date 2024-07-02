
//corregir
const db = require("../db/db.js");

const createPizza = (req, res)=>{
    const {name, price, ingredients,description,img,state} = req.body;

    // creamos la consulta
    const sql = 'INSERT INTO products (productName, price, ingredients,description,img,state) VALUES (?, ?,?,?,?,?)';

    //Enviamos la consulta a la bbdd
    db.query(sql,[name, price, ingredients,description,img,state],(err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Pizza creada"})
    });
}


//exportacion de modulos
module.exports = {
    createPizza
}