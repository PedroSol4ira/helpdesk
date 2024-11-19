import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAllEquipament(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const equipament = await prisma.equipaments.findMany({
                select: {
                    id: true,
                    name: true,
                    mark: true,
                    SerialNumber: true,
                    type: true

                }
            })
            res.status(200).json({ message: (equipament) })
        } catch (error) {
            res.status(404).json({ message: "Nenhum equipamento encontrado" })
        }
    }
}