import express from "express";
const app = express();
const port = 3000;
import usuario from "usuarios.js";

app.post("/crearusuario", usuario.CrearUsuario);
app.post("/login", usuario.Login);
app.post("/escucho", usuario.Escucho);