import Router from "express"
import funciones from "../usuarios.js"
import middleware from "../middlewares/middleware.js"


const router = Router()
router.post("/:id", funciones.Escucho)

export default router