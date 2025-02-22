'use client'

import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from "react"
import "../../styles/signUp.css"
import Link from 'next/link'
type Schema = z.infer<typeof schema>

//入力データの検証ルールを定義
const schema = z.object({
    email: z.string().email({ message: 'メールアドレスの形式ではありません。'}),
    password: z.string().min(6, { message: '6文字以上入力する必要があります。'}),
})

//ログインページ
const LoginPage = () => {
    const router = useRouter();
    const [ loading, setLoading] = useState(false);
    const [ message, setMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        //初期値
        defaultValues: { email: '', password: '' },
        //入力検証
        resolver: zodResolver(schema),
    })

    //送信
    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)

        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signIn`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            })

            const user = await res.json();
            console.log(user)
            
            if(res.ok) {
                router.push('/');
            } else {
                alert(res)
            }
        } catch(err) {
            setMessage('エラーが発生しました。' + err)
            return 
        } finally {
            setLoading(false);
            router.refresh();
        }
    }
    return (
        <>
            <h2>ログイン</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
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
                <input type="submit" className="submit-btn" value="ログイン"/>
            </form>

            {message && <div>{message}</div>}

            <Link href={"/"}>
                パスワードを忘れた方はこちら
            </Link>

            <Link href={"/"}>
                アカウントを作成する
            </Link>
        </>
    )
}

export default LoginPage;