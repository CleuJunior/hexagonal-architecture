import { Express } from "express"
import LoginUsuario from "@/core/usuario/service/LoginUsuario"
import ProvedorJwt from "@/external/api/ProvedorJwt"
import * as process from "process"

export default class LoginUsuarioController {

    constructor(servidor: Express, casoDeUso: LoginUsuario) {
        servidor.post("/api/v1/usuarios/login", async (req, resp) => {
            try {
                const usuario = await casoDeUso.executar({
                    email: req.body.email,
                    senha: req.body.senha
                })

                const provedorJwt = new ProvedorJwt(process.env.JWT_SECRET!)

                resp.status(200).send(provedorJwt.gerar(usuario))
            } catch (e: any) {
                resp.status(400).send(e.message)
            }
        })
    }
}