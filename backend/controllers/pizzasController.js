
const db = require("../db/db.js");

const createPizza = (req, res)=>{
    
    const {name, price, ingredients,description,img,state} = req.body;
    const idAdmin = req.userId;
    
    // creamos la consulta
    const sql = 'INSERT INTO products (productName, price, ingredients,description,img,state,administrator_idAdmin) VALUES (?, ?,?,?,?,?,?)';

    //Enviamos la consulta a la bbdd
    db.query(sql,[name, price, ingredients,description,img,state,idAdmin],(err, result)=>{
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