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

const middleware = {
    verifyToken
}
export default middleware