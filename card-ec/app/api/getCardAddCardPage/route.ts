import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";


export const GET = async (req: Request) => {
    const page = parseInt(new URL(req.url).searchParams.get('page') || '1', 10);//パラメータからページ番号を取得し、整数に変換。new URL(req.url)でURLをオブジェクトに変換してから取得する。
    //1ページ当たりの最大件数
    const limit = 30;
    //何番目のレコードから取得するのかを決める(2ページ目であれば(2 - 1) * 10 = 10となるため10番目のレコードから10件を取得する)
    const offset = (page - 1) * limit;

    try {
        const data = await prisma.cards.findMany({
            skip: offset,//offsetの値分スキップする
            take: limit//limitの数取得する
        });

        const totalItems = await prisma.cards.count();//すべてのカード情報の数
        const totalPages = Math.ceil(totalItems / limit);//すべてのカード情報の数を1ページ当たりの最大件数で割り必要ページ数を計算

        return NextResponse.json({
            data,//取得したカード情報
            totalItems,//すべてのデータの数
            totalPages,//必要ページ数
            currentPage: page//現在のページ数
        });
    } catch(err) {
        return NextResponse.json({ message: err });
    }
}   