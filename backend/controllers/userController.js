
const db = require("../db/db.js");

//para manejar JWT
const jwt = require('jsonwebtoken');

//para cifrar contraseñas
const bcrypt = require('bcryptjs');

// Importamos la configuración (clave secreta y duración del token)
const config = require('../config/config.js');

const createUser = (req, res)=>{
    
    const {name, surname, email,password,role} = req.body;
    try {
      if(role=="admin"){
          // Verificamos si el usuario ya existe
          const checkUserSql = 'SELECT * FROM administrator WHERE email = ?';
          db.query(checkUserSql, [email], async (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              return res.status(400).json({ message: 'User already exists' });
            }
      
            // Hasheamos la contraseña
            const hashedPassword = bcrypt.hashSync(password, 8); 
      
            // Insertamos nuevo usuario
         
              const newUserSql = 'INSERT INTO administrator (adminName, adminSurname, email, password, role) VALUES (?, ?, ?, ?, ?)';
              
              db.query(newUserSql, [name, surname, email, hashedPassword, role], (err, result) => {
                  // Generamos un token JWT para el nuevo usuario 
                  const payload = { name: name, surname: surname,emmail:email,role:role}; 
                  const secretKey = config.secretKey; 
                  const options = { expiresIn: config.tokenExpiresIn }

                  // Generamos el token
                  const token = jwt.sign(payload, secretKey, options);
                  if (err) throw err;
                  res.status(201).json({ message: `User ${role} registered successfully - ${token}`});
              });
            
            
          });
        }else{
          res.status(201).json({ message: `User ${role} registered successfully`});
        }
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
   
}

// Función para iniciar sesión de un usuario
const loginUser = (req, res) => {
    // Obtenemos el mail y la contraseña del cuerpo de la solicitud
    const { email, password } = req.body;

    // Buscamos en la BD un usuario que coincida con el nombre de usuario
  const sql = 'SELECT * FROM administrator WHERE email = ?';
  db.query(sql, [email], (err, result) => {
        if (err) {
        return res.status(500).send({ message: 'Server error' });
        }

        if (result.length === 0) {
        return res.status(404).send({ message: 'Usuario no encontrado.' });
        }

        const user = result[0];
        

        // Comparamos la contraseña proporcionada con la almacenada en la base de datos
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null });
        }

        // Generar un token JWT para el usuario
        const payload = { id:user.idAdmin,name: user.adminName, surname: user.adminSurname,email:user.email,role:user.role};
        const secretKey = config.secretKey;
        const options = { expiresIn: config.tokenExpiresIn };

        const token = jwt.sign(payload, secretKey, options);

        // Envía el token JWT al cliente con estado 200 (éxito)
        res.status(200).send({ auth: true, token });
    })
    
}

//exportacion de modulos
module.exports = {
    createUser,loginUser
}