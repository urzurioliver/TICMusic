import express from "express";
const app = express();
app.use(express.json())
const port = 3000;
import funciones from "./usuarios.js";

app.post("/crearusuario", funciones.CrearUsuario);
app.post("/login", funciones.Login);
app.post("/escucho", funciones.Escucho);

app.listen(port, () => {
  console.log(`Servidor levantado y escuchando en http://localhost:${port}`);
}); 