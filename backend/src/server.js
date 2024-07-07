const express = require("express");
const app = express();
const PORT = 3000;

const pizzasRouter = require("../routes/pizzasRoutes");
const pedidosRouter = require("../routes/ordersRoutes");
const contactoRouter = require("../routes/contactRoutes");
const adminRouter = require("../routes/userRoutes");
app.use(express.json())

app.use("/pizzas",pizzasRouter);
app.use("/pedidos",pedidosRouter);
app.use("/contacto",contactoRouter);
app.use("/admin",adminRouter);

app.listen(PORT, ()=>{
    console.log(`servidor escuchando ${PORT}`)
})