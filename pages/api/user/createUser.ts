import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function CreateUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { name, email, password, userType } = req.body;

            const userTypeMap: { [key in 'administrador' | 'tecnico' | 'usuario']: number } = {
                administrador: 1,
                tecnico: 2,
                usuario: 3,
            };

            const mappedUserType = userTypeMap[userType as 'administrador' | 'tecnico' | 'usuario'] || 3;

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    userType: mappedUserType
                },
            });

            res.status(200).json("Usuário criado com sucesso");
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            res.status(500).json("Algo deu errado");
        }
    }
}
