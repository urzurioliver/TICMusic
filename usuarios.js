const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const claveSuperSecretaAntiBoludos = 'calveSuperSecretaAntiBoludos'
const CrearUsuario = async (req, res) => {
const saltRounds = 10;
    const { userid, nombre, password } = req.body;
  const hashed = await bcrypt.hash(password, saltRounds)
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
    let payloadOriginal = null

    try{
      payloadOriginal = await jwt.verify(token,   claveSuperSecretaAntiBoludos)
    } catch(e) {
      console.error(e)
     }
  }
  const Login = async (req, res) => {
    const {nombre, password} = req.body;
    const userdata =
    await query(
      "SELECT nombre, password FROM usuarios "
    )
    if (nombre == userdata[0].nombre){
      const esCorrecta = await bcrypt.compare(password, userdata[0].password);
      if(esCorrecta){
        const token = jwt.sign(
          { id: userdata[0].id, nombre: userdata[0].nombre },
          process.env.JWT_SECRET || 'tu_clave_secreta', // Usa siempre variables de entorno
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
    Login
  };
  
  export default funciones;