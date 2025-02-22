import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const { email, password } = await req.json();

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
    
        if(!user) {
            return NextResponse.json({ error: 'ユーザーが見つかりませんでした。'});
        }
    
        const isPasswordCorrect = await bcrypt.compare(password, user.password!);
    
        if(!isPasswordCorrect) {
            return NextResponse.json({ error: 'パスワードが間違っています。'});
        }

        return NextResponse.json({ user });
    } catch(err) {
        return NextResponse.json({ error: 'ログイン中にエラーが発生しました。' });
    }
    
}