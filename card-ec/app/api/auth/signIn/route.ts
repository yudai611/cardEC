import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const { userName, password } = await req.json();

    try {
        const user = await prisma.user.findFirst({
            where: {
                name: userName
            }
        });
    
        if(!user) {
            return NextResponse.json({ error: 'ユーザーが見つかりませんでした。'});
        }
        
        //送られてきたパスワードとDBのハッシュ化されたパスワードを比較する
        const isPasswordCorrect = await bcrypt.compare(password, user.password!);
    
        if(!isPasswordCorrect) {
            return NextResponse.json({ error: 'パスワードが間違っています。'});
        }

        return NextResponse.json({ user });
    } catch(err) {
        return NextResponse.json({ error: 'ログイン中にエラーが発生しました。' });
    }
    
}