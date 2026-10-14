import { query } from "../services/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import middleware from "../middlewares/middleware.js";

const claveSuperSecretaAntiBoludos = 'calveSuperSecretaAntiBoludos'
const CrearUsuario = async (req, res) => {
    const {nombre, password } = req.body;
  const hashed = await bcrypt.hash(password, 10)
  await query(
    "INSERT INTO usuario (nombre, password) VALUES ($1, $2)",
    [nombre, hashed]
  );
  
  
  res.status(201).json({ message: "Usuario creado exitosamente" });
  };

  const Escucho = async (req, res, next) => {
    const {token} = req.body; 
    let payloadOriginal = null

    try{
      payloadOriginal = await jwt.verify(token, claveSuperSecretaAntiBoludos)
    } catch(e) {
      console.error(e)
     }
    const result = await query ("SELECT * FROM usuario INNER JOIN escucha on usuario.id = escucha.usuario_id inner join cancion on escucha.cancion_id = cancion.id WHERE usuario.id = $1 ", 
    [payloadOriginal.id]
  );
  return res.status(200).json(result.rows);
  }
  const Login = async (req, res) => {
    const {nombre, password} = req.body;
    const userdata =
    await query(
      "SELECT id, nombre, password FROM usuario WHERE nombre=$1",[nombre]
    )
    console.log(userdata.rows)
     if (userdata.rows.length === 0) {
    return res.status(401).json({ error: "El usuario no existe" });
  }
    else {
      const esCorrecta = await bcrypt.compare(password, userdata.rows[0].password);
      if(esCorrecta){
        const token = jwt.sign(
          { id: userdata.rows [0].id, nombre: userdata.rows[0].nombre },
          claveSuperSecretaAntiBoludos,
          { expiresIn: '2h' });
        return res.status(200).json({message: "Autenticación exitosa",token});}
      else{
        return res.status(401).json({ message: "contraseña incorrecta" });
    }
  }
  }
  const createCancion = async (req, res) => {
    const { nombre } = req.body;
    verifyAdmin(req, res, async () => { // zuri tengo que seguir trabajando aca, me dio sueno jajant

    if(!nombre){
      return res.status(400).json({ message: "ingresar nombre" });
    }
    await query(
      "INSERT INTO cancion (nombre) VALUES ($1)",
      [nombre]
    );
    res.status(201).json({ message: "Canción creada exitosamente" });
  };

  const funciones = {
    CrearUsuario,
    Login,
    Escucho,
    createCancion
  };
  
  export default funciones;
