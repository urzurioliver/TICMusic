const bcrypt = require('bcrypt');
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
  const Login = async (req, res) => {
    const {nombre, password} = req.body;
    const userdata =
    await query(
      "SELECT nombre, password FROM usuarios "
    )
    if (nombre == userdata.nombre){
      bcrypt.compare(password, userdata.hashed)
    }
  }
  const funciones = {
    CrearUsuario,
    Login
  };
  
  export default funciones;