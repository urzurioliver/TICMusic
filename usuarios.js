const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const claveSuperSecretaAntiBoludos = 'calveSuperSecretaAntiBoludos'
const CrearUsuario = async (req, res) => {
    const { userid, nombre, password } = req.body;
  const hashed = await bcrypt.hash(password, 10)
  await query(
    "INSERT INTO usuarios (userid, nombre, password) VALUES ($1, $2, )",
    [userid, nombre, hashed]
  );
  
  const result = await query(
    "SELECT * FROM canciones ORDER BY id DESC LIMIT 1"
  );
  
  res.status(201).json(result.rows[0]);
  };

  const verEscuchas = async (req, res, next) => {
    const {token} = req.body; 
    let payloadOriginal = null

    try{
      payloadOriginal = await jwt.verify(token,   claveSuperSecretaAntiBoludos)
    } catch(e) {
      console.error(e)
     }
    const result = await query ("SELECT 
  }
  const Login = async (req, res) => {
    const {userid, password} = req.body;
    const userdata =
    await query(
      "SELECT nombre, password FROM usuarios WHERE id=$1",[userid]
    )
    const usuario = userdata.rows[0]
    if (nombre == usuario.nombre){
      const esCorrecta = await bcrypt.compare(password, userdata[0].password);
      if(esCorrecta){
        const token = jwt.sign(
          { id: usuario.id, nombre: usuario.nombre },
          process.env.JWT_SECRET, 
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
    verEscuchas
  };
  
  export default funciones;