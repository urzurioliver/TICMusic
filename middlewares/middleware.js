import jwt from "jsonwebtoken"

let claveSuperSecretaAntiBoludos = "calveSuperSecretaAntiBoludos"
async function verifyToken(req, res, next){
    console.log("Authorization:", req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token obtenido:", token);
    if (!token) return res.status(401).json({ error: "Falta el token" });
    try{
        req.user = await jwt.verify(token, claveSuperSecretaAntiBoludos)
        console.log("verificado")
        next()
    } catch(e){
        console.error(e)
    }
}
async function VerifyAdmin(req, res, next){
    if (req.user.rol === "A"){
    next()
    }
    else {
        return res.status(403).send({error: "Unauthorized"});
    }
}
const middleware = {
    verifyToken,
    VerifyAdmin
}
export default middleware