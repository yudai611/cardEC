import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: Response) {
    const { value } = await req.json();

    try {
        //送信されてきた値を元にカード情報を取得する
        const cardsData = await prisma.cards.findMany({
            where: {
                cardName: {
                    contains: value//送信されてきた値がカード名に含まれているカード情報を取得
                }
            }
        });

        return NextResponse.json(cardsData);
    } catch(err) {
        return NextResponse.json({ message: `カード情報を取得できませんでした。エラー： ${err}`});
    }
    
}