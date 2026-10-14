import jwt from "jsonwebtoken"

async function verifyToken(req, res, next){
    const { token } = req.body
    let payloadOriginal = null
    try{
        payloadOriginal = await jwt.verify(token, claveSuperSecretaAntiBoludos)
        req.user_id = payloadOriginal.id
        next()
    } catch(e){
        console.error(e)
    }
}
async function VerifyAdmin(req, res, next){
    const role = await query ("SELECT rol FROM usuarios WHERE id = $1", [req.user_id]);
    if (role == "A"){
        next()
    }
    else {
        return res.status(401).send({error: "Unauthorized"});
    }
}
const middleware = {
    verifyToken,
    VerifyAdmin
}
export default middleware