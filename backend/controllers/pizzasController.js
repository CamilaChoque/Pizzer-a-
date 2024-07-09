
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

const updatePizza = (req, res)=>{
    const {id} = req.params;
    const {name, price, ingredients,description,img,state} = req.body;
    const idAdmin = req.userId;
    // creamos la consulta
    const sql = 'UPDATE products SET productName = ?, price = ?, ingredients = ?, description = ?, img = ?, state = ?,administrator_idAdmin=? WHERE idProducts = ?';

    //Enviamos la consulta a la db
    db.query(sql,[name, price, ingredients,description,img,state,idAdmin,id],(err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Pizza actualizada"})
    });
}

const deletePizza = (req, res) => {
    //Obtenemos el id de la pizza
    const {id} = req.params;

    //Creamos la consulta
    const sql = 'DELETE FROM products WHERE idProducts = ?';

    //Enviamos la consulta a la db
        db.query(sql, [id],(err, result)=>{
        // Si sucede un error
        if(err){
            throw err;
        }
        // Si no hay error
        res.json({mensaje:"Pizza eliminada con exito!"});
    });
}

//exportacion de modulos
module.exports = {
    createPizza,
    deletePizza,
    updatePizza
}