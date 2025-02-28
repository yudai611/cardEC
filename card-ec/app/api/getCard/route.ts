import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request, res: Response) {
    try {
        //Cardsテーブルに登録されている情報をすべて取得。
        const card = await prisma.cards.findMany();

        return NextResponse.json(card)
    } catch(err) {
        return NextResponse.json({ message: `カード情報の取得に失敗しました。エラー：${err}` });
    }
}