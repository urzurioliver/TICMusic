import express from "express";
const app = express();
const port = 3000;
import funciones from "usuarios.js";

app.post("/crearusuario", funciones.CrearUsuario);
app.post("/login", funciones.Login);
app.post("/escucho", funciones.Escucho);