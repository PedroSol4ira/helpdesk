import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createEquipaments(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        try {
            const { name, mark, SerialNumber, type } = req.body;
            if (!name || !mark || !SerialNumber || !type) {
                res.status(400).json({ message: "Preencha todos os campos" })
            }

            const equipament = await prisma.equipaments.create({
                data: {
                    name,
                    mark,
                    SerialNumber,
                    type
                }
            })
            res.status(200).json({ message: 'Equipamento criado com sucesso' })
        } catch (error) {
            res.status(500).json({ message: 'Erro de comunicação com o servidor' })
        }



    }
}