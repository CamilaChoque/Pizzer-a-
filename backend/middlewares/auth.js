// Para verificar los tokens
const jwt = require('jsonwebtoken');
// Para manejar configuraciones
const config = require('../config/config');



 const authMiddleware= (req, res, next)=> {
  // Determinamos si hay un token en la cabecera de autorización
  const authHeader = req.headers['authorization'];

  // En el caso de que la solicitud falle
  // Si no hay token en la cabecera, devuelvomes un error 401 (no autorizado)
  if (!authHeader){
    return res.status(401).send({ auth: false, message: 'No se provee token en la cabecera' });}; 

    //Si todo va bien
  // Extraemos el token de la cabecera
  const token = authHeader.split(' ')[1];

  // Si no existe el token extraído, devuelvomes un error 403 (denegado)
  if (!token){
    return res.status(403).send({ auth: false, message: "No se provee token" });
};
    //acceso denegado, la autentificación falló, no se provee token

  // Verificado el token usando la clave secreta y maneja los errores posibles
  // Traemos la clave secreata para utilizarla en .verify
  const secretKey = config.secretKey;

  jwt.verify(token, secretKey, (err, decoded) => {
    // Si hay un error al verificar como un token mal formado, devuelve un error con mensaje
    if (err) return res.status(500).send({ auth: false, message: 'Error al autenticar el token.' });
    // Verificar el rol del usuario (administrador)
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador' });
    }
    // Si todo está bien con el token, procedemos con la solicitud y guarda el id del usuario en request.user_id 
    req.userId = decoded.id;
    req.username = decoded.username;
    next(); // Llamamos a la siguiente función del middleware o controlador
  });
};

module.exports = authMiddleware;