import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import prisma from "../prisma";
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const nextAuthOptions: NextAuthOptions = {
    debug: false,
    providers: [
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                userName: { label: 'ユーザー名', type: 'text', placeholder: 'ユーザー名'},
                password: { label: 'パスワード', type: 'password'}
            },
            async authorize(credentials) {

                console.log(credentials);
                //ユーザー名またはパスワードが空の場合
                if(!credentials?.userName || !credentials.password) {
                    throw new Error('ユーザー名とパスワードは必須入力です。');
                }

                //送られてきたユーザー名と一致するユーザー名がDBに存在するか
                const user = await prisma.user.findFirst({
                    where: { name: credentials.userName },
                })

                if(!user) {
                    throw new Error('Email does not exists')
                }

                //ハッシュ化されたパスワードと送られてきたパスワードを比較する
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,//送られてきたパスワード
                    user.password!,//DBに保存されているハッシュ化されたパスワード
                )

                if(!isCorrectPassword) {
                    throw new Error('Incorrect password')
                }

                console.log(user);
                return user
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    //セッション情報をサーバーに保存せず、トークンを生成し、それをクライアント側に保存する設定
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma),
    callbacks: {
        //ログイン時にトークンにユーザー情報を追加する
        jwt: ({ token, user }) => {
            if (user) {
              return {
                ...token,
                id: user.id,
              };
            }
            return token;
        },
        //トークンからセッション情報を取得
        session: ({ session, token }) => {
            return {
              ...session,
              user: {
                ...session.user,
                id: token.id,
              },
            };
          },
    },
    secret: process.env.AUTH_SECRET,
}