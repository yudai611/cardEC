import prisma from "@/app/lib/prisma";
import { Card } from "../types/types";
import { NextResponse } from "next/server";


//送られてきたユーザーIDを使用し、そのユーザーが登録しているカードを取得する
export const POST = async (req: Request, res: Response) => {
    const { userId } = await req.json();
    console.log(userId)
    try {
        const cards = await prisma.user_Card.findMany({
            where: {
                userId: userId
            }
        });

        console.log(cards)
    
        const cardsData = cards.map( async (card) => {
            await prisma.cards.findMany({
                where: {
                    cardId: card.cardId
                }
            });
        });

        return NextResponse.json(cardsData);
    } catch(e) {
        return NextResponse.json({message: `エラー： ${e}`});
    }
}