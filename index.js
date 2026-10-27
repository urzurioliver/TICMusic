import express from "express";
import middleware from "./middlewares/middleware.js";
import cancionesRouter from "./routes/canciones.router.js"
import escuchaRouter from "./routes/escucha.router.js"
const app = express();
app.use(express.json())
const port = 3000;
import funciones from "./controllers/usuarios.js";

app.post("/crearusuario", funciones.CrearUsuario);
app.post("/login", funciones.Login);

app.use("/escucha", middleware.verifyToken, escuchaRouter)

app.use("/canciones", middleware.verifyToken, middleware.VerifyAdmin, cancionesRouter)

app.listen(port, () => {
  console.log(`Servidor levantado y escuchando en http://localhost:${port}`);
}); 
export default app;