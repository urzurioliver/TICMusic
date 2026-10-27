import Router from "express"
import funciones from "../controllers/usuarios.js"
import middleware from "../middlewares/middleware.js"


const router = Router()

router.post("/crearCancion", middleware.verifyToken, middleware.VerifyAdmin, funciones.createCancion)
router.put("/cambiarNombre", middleware.verifyToken, middleware.VerifyAdmin, funciones.cambiarNombreCancion)
router.delete("/borrarCancion", middleware.verifyToken, middleware.VerifyAdmin, funciones.borrarCancion)

export default router