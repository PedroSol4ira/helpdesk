import prisma from "@/lib/prisma";
import { role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function CreateUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { name, email, password, role } = req.body

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    userType: role
                }
            })

            res.status(200).json("Usuário criado com Sucesso")
        } catch (error) {
            res.status(500).json("Algo deu errado")
        }
    }
}