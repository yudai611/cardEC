import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';


export async function POST(req: Request, res: Response) {
    try {
        if(req.method !== 'POST') {
            return NextResponse.json({ message: 'Bad Request'}, { status: 405})
        }

        const { userName, password } = await req.json();

        //送られてきたユーザー名と一致するユーザー名がDBに存在するかどうか
        const existingUser = await prisma.user.findFirst({
            where: { 
                name: userName ,
            },
        });
        //存在する場合
        if(existingUser) {
            return NextResponse.json({ message: 'Email taken'}, { status: 422 });
        }

        //パスワードを暗号化
        const hashedPassword = await bcrypt.hash(password, 12)

        //userデーブルにレコードを作成
        const user = await prisma.user.create({
            data: {
                name: userName,
                password: hashedPassword,
                image: '',
                emailVerified: new Date()
            },
        });

        return NextResponse.json({ user }, { status: 201 })
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}