import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAllUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const user = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    userType: true,
                    email: true

                }
            })
            res.status(200).json(user);
        } catch (error) {
            console.log("Algo deu errado")
            return res.status(500).json({ message: "algo deu errado" })
        }
    }
}