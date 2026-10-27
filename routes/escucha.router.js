import Router from "express"
import funciones from "../controllers/usuarios.js"
import middleware from "../middlewares/middleware.js"


const router = Router()
router.post("/", middleware.verifyToken, funciones.escucharCancion)

export default router