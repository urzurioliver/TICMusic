import Router from "express"
import funciones from "../controllers/usuarios.js"
import middleware from "../middlewares/middleware.js"


const router = Router()

router.post("/", funciones.createCancion)
router.put("/", funciones.changeSongName)
router.delete("/", funciones.deleteSong)

export default router