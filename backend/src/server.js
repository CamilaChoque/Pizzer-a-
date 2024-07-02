const express = require("express");
const app = express();
const PORT = 3000;

const pizzasRouter = require("../routes/pizzasRouter");
const pedidosRouter = require("../routes/pedidosRouter");
const contactoRouter = require("../routes/contactoRouter");
const adminRouter = require("../routes/administracionRouter");
app.use(express.json())

app.use("/pizzas",pizzasRouter);
app.use("/pedidos",pedidosRouter);
app.use("/contacto",contactoRouter);
app.use("/adminitracion",adminRouter);

app.listen(PORT, ()=>{
    console.log(`servidor escuchando ${PORT}`)
})