import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";


export const POST = async (req: Request, res: Response) => {
    const { userId, cardId }  = await req.json();

    //ユーザが登録したカードを格納するテーブル(User_Card)にレコードを作成
    // await prisma.user_Card.create({
    //     data: {
    //         userId: userId,
    //         cardId: cardId,
            
    //     }
    // });
}