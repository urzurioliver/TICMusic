import express from "express";
import middleware from "./middleware.js";
const app = express();
app.use(express.json())
const port = 3000;
import funciones from "./usuarios.js";

app.post("/crearusuario", funciones.CrearUsuario);
app.post("/login", funciones.Login);
app.post("/escucho", middleware.verifyToken, funciones.Escucho);

app.listen(port, () => {
  console.log(`Servidor levantado y escuchando en http://localhost:${port}`);
}); 
export default app;