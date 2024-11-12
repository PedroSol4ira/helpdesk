import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function ValidationLogin(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json("Usuário e senha Obrigatório")
            }

            const user = await prisma.user.findUnique({
                where: { email }
            })

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado!" })
            }

            if (password !== user.password) {
                return res.status(401).json({ message: "Senha icorreta" })
            }

            if (user.userType === 1) {
                return res.status(200).json({ message: "Você entrou como administrador" })
            }
            if (user.userType === 2) {
                return res.status(200).json({ message: "Você entrou como tecnico" })
            }
            if (user.userType === 3) {
                return res.status(200).json({ message: "Você entrou como usuario" })
            }



            if (password !== user.password) {
                return res.status(401).json("Senha incorreta")
            }


            return res.status(200).json({
                message: "Logado como admin",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    userType: user.userType
                }
            })



        } catch (error) {
            return res.status(500).json("Houve um erro")
        }
    }

}