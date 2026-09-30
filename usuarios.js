const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const claveSuperSecretaAntiBoludos = 'calveSuperSecretaAntiBoludos'
const CrearUsuario = async (req, res) => {
    const { userid, nombre, password } = req.body;
  const hashed = await bcrypt.hash(password, 10)
  await query(
    "INSERT INTO usuarios (userid, nombre, password) VALUES ($1, $2, $3)",
    [userid, nombre, hashed]
  );
  
  const result = await query(
    "SELECT * FROM canciones ORDER BY id DESC LIMIT 1"
  );
  
  res.status(201).json(result.rows[0]);
  };

  const Escucho = async (req, res, next) => {
    const {token} = req.body; 
    let payloadOriginal = null

    try{
      payloadOriginal = await jwt.verify(token, claveSuperSecretaAntiBoludos)
    } catch(e) {
      console.error(e)
     }
    const result = await query ("SELECT * FROM usuarios WHERE id = $1", 
    [payloadOriginal.id]
  );
  return res.status(200).json(result.rows[0]);
  }
  const Login = async (req, res) => {
    const {userid, password} = req.body;
    const userdata =
    await query(
      "SELECT id, nombre, password FROM usuarios WHERE userid=$1",[userid]
    )
    const usuario = userdata.rows[0]
     if (userdata.rows.length === 0) {
    return res.status(401).json({ error: "El usuario no existe" });
  }
    else if (nombre == usuario.nombre){
      const esCorrecta = await bcrypt.compare(password, usuario.password);
      if(esCorrecta){
        const token = jwt.sign(
          { id: usuario.id, nombre: usuario.nombre },
          claveSuperSecretaAntiBoludos,
          { expiresIn: '2h' });
        return res.status(200).json({message: "Autenticación exitosa",token});}
      else{
        return res.status(401).json({ message: "contraseña incorrecta" });
    }
  }
    else{
      return res.status(401).json({ message: "Usuario incorrecto" });}
  }
  

  const funciones = {
    CrearUsuario,
    Login,
    Escucho
  };
  
  export default funciones;