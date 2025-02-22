import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { User } from "next-auth";
import prisma from "../prisma";
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const nextAuthOptions: NextAuthOptions = {
    debug: false,
    providers: [
        Credentials({
            id: 'user',
            name: 'User',
            credentials: {
                email: { label: 'メールアドレス', type: 'email', placeholder: 'メールアドレス'},
                password: { label: 'パスワード', type: 'password'}
            },
            async authorize(credentials) {
                //メールアドレスまたはパスワードが空の場合
                if(!credentials?.email || !credentials.password) {
                    throw new Error('Email and password required');
                }

                //送られてきたメールアドレスと一致するメールアドレスがDBに存在するか
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })

                if(!user || !user.password) {
                    throw new Error('Email does not exists')
                }

                //ハッシュ化されたパスワードと送られてきたパスワードを比較する
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,//送られてきたパスワード
                    user.password,//DBに保存されているハッシュ化されたパスワード
                )

                if(!isCorrectPassword) {
                    throw new Error('Incorrect password')
                }

                return user
            },
        }),
    ],
    pages: {
        signIn: '/',
    },
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session: ({session, user}) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id
                }
            }
        }
    },
    secret: process.env.AUTH_SECRET,
}