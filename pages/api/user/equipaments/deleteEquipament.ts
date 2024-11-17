import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deleteEquipament(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'DELETE') {
            const { id } = req.body;

            const equipament = await prisma.equipaments.deleteMany({
                where: {
                    id: id
                }
            })
            res.status(200).json({ message: 'Equipamento excluído com sucesso!' })
        } else {
            res.status(401).json("Metodo nao permitido")
        }
    } catch (error) {
        res.status(500).json({ message: 'Houve um erro' })
    }
}