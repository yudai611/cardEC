'use client'

import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from "react"
import "../../styles/signUp.css"
import Link from 'next/link'
import prisma from '../lib/prisma'
import bcrypt from 'bcryptjs'
type Schema = z.infer<typeof schema>

//入力データの検証ルールを定義
const schema = z.object({
    name: z.string().min(2, { message: '2文字以上入力する必要があります。'}),
    email: z.string().email({ message: 'メールアドレスの方式ではありません。'}),
    password: z.string().min(6, { message: '6文字以上で入力する必要があります。'})
})

const SignUpPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: { name: '', email: '', password: ''},
        resolver: zodResolver(schema)
    });

    //送信
    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signUp`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password,
                        name: data.name
                    })
                }
            );

            if(res.ok) {
                alert('会員登録に成功しました。');
            } else {
                alert('会員登録に失敗しました。');
            }
        } catch(err) {
            setMessage('エラーが発生しました。' + err)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h2>新規登録</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <label>
                    メールアドレス<br />
                    <input 
                        type="text"
                        id="name"
                        className="input"
                        placeholder='ニックネーム'
                        {...register('name', { required: true })}
                    />
                    <div>{errors.name?.message}</div>
                </label>
                <br />
                <label>
                    メールアドレス<br />
                    <input 
                        type="email"
                        id="email"
                        className="input"
                        placeholder='メールアドレス'
                        {...register('email', { required: true })}
                    />
                    <div>{errors.email?.message}</div>
                </label>
                <br />
                <label>
                    パスワード<br />
                    <input
                        type="password"
                        id="password"
                        className="input"
                        placeholder='パスワード'
                        {...register('password', { required: true })}
                     />
                    <div>{errors.password?.message}</div>
                </label>
                <br />
                <input type="submit" className="submit-btn" value="新規登録"/>
            </form>

            {message && <div>{message}</div>}

            <Link href={"/login"}>ログインはこちら</Link>
        </>
    )
}

export default SignUpPage