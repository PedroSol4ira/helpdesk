import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import argon2 from 'argon2';

export default async function ValidationLogin(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Usuário e senha Obrigatório" });
            }

            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }

            const isPasswordHash = await argon2.verify(user.password, password);
            if (!isPasswordHash) {
                return res.status(401).json({ message: "Senha incorreta!" });
            }

            let message;
            switch (user.userType) {
                case 1:
                    message = "Você entrou como administrador";
                    break;
                case 2:
                    message = "Você entrou como técnico";
                    break;
                case 3:
                    message = "Você entrou como usuário";
                    break;
                default:
                    message = "Tipo de usuário desconhecido";
            }

            return res.status(200).json({
                message,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    userType: user.userType,
                },
            });

        } catch (error) {
            console.log("Algo deu errado", error);
            return res.status(500).json({ message: "Houve um erro" });
        }
    }
}
