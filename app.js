//creación servidro estatico
const http = require("http");
const fs = require("fs");
const PORT = 3000;

//opciones del servidor
const serverOptions={
    timeout:30000,
    maxconections: 100,
};

//funcion que maneja las solicitudes
const requestListener = function(req,res){
    const archivo = fs.readFileSync(__dirname+"/index.html");

    const cabecera={'Content-Type':'text/html;charset-UTF-8'}
    res.writeHead(200,cabecera);

    //enviamos el mdocumento estatico
    res.end(archivo)

}

//declaracion del servidor
const server = http.createServer(serverOptions,requestListener);

//encendemos el servidor
server.listen(PORT,function(){console.log("servidor en puerto: 3000")})