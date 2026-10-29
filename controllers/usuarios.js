import { query } from "../services/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const claveSuperSecretaAntiBoludos = 'calveSuperSecretaAntiBoludos'
const CrearUsuario = async (req, res) => {
    const {nombre, password } = req.body;
  const hashed = await bcrypt.hash(password, 10)
  await query(
    'INSERT INTO "Usuario" (nombre, password) VALUES ($1, $2)',
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
      'SELECT id, nombre, password FROM "Usuario" WHERE nombre=$1',[nombre]
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

    if(!nombre){
      return res.status(400).json({ message: "ingresar nombre" });
    }
    await query(
      "INSERT INTO cancion (nombre) VALUES ($1)",
      [nombre]
    );
    res.status(201).json({ message: "Canción creada exitosamente" });
  }

  async function cambiarNombreCancion (req, res) {
    const {id, nuevoNombre} = req.body

    if(!nuevoNombre || !id){
      return res.status(400).json({ message: "ingresar nombre"})
    }

    await query (
      'UPDATE "Cancion" SET nombre = $1 WHERE id = $2', [nuevoNombre, id]
    )
    return res.status(202).json({ message: "Nombre cambiado exitosamente"})
  }

  async function borrarCancion (req, res){
    const {id} = req.body
    if(!id){
      return res.status(400).json({message: "poné el ID"})
    }

    await query ('DELETE * FROM "Escucha" WHERE id = $1', [id] )
    await query ('DELETE * FROM "Cancion" WHERE id = $1', [id])

    return res.status(204).json({message: "Cancion borrada exitosamente"})
  }  

  async function escucharCancion (req, res){
    const {id} = req.body
    const usuario = req.user_id
    if(!id){
      return res.status(400).json({message: "poné el ID"})
    }
    console.log("1")
    await query ('INSERT INTO "Escucha" (usuario_id, cancion_id) SELECT $1, $2 WHERE NOT EXISTS (SELECT 1 FROM "Escucha" WHERE usuario_id = $1 AND cancion_id = $2)', [usuario, id]) 
    console.log("2")
    const escuchas = await query('SELECT reproducciones FROM "Escucha" WHERE usuario_id = $1', [usuario])
    console.log(escuchas.rows[0].reproducciones)
    if(escuchas.rows[0].reproducciones == null){
      await query('UPDATE "Escucha" SET reproducciones = 1 WHERE usuario_id = $1 AND cancion_id = $2', [usuario, id])
      console.log("null")
      return res.status(200).json({message: "Escucha registrada exitosamente"})
    } else if(escuchas.rows[0].reproducciones <=10){
      await query('UPDATE "Escucha" SET reproducciones = reproducciones + 1 WHERE usuario_id = $1 AND cancion_id = $2', [usuario, id])
      console.log("menos de 10")
      return res.status(200).json({message: "Escucha registrada exitosamente"})
    } else if(escuchas.rows[0].reproducciones >10){
      await query('UPDATE "Usuario" SET fan = true WHERE id = $1', [usuario])
      await query('UPDATE "Escucha" SET reproducciones = reproducciones + 1 WHERE usuario_id = $1 AND cancion_id = $2', [usuario, id])
      return res.status(200).json({message: "Escucha registrada exitosamente"})
      console.log("mas de 10")
    }

  }

  const funciones = {
    CrearUsuario,
    Login,
    Escucho,
    createCancion,
    cambiarNombreCancion,
    borrarCancion,
    escucharCancion

  };
  
  export default funciones
