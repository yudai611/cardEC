'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import "../../styles/signUp.css"
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'

//ログインページ
const LoginPage = () => {
    const router = useRouter();
    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError] = useState('');

    const { data: session } = useSession();
    const user = session?.user;
    console.log(user);

    useEffect(() => {
        if(user) {
            router.push("/");
        }
    },[user]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await signIn('credentials', {
            redirect: false,
            userName,
            password,
        });

        if(res?.ok) {
            router.push("/");
        } else {
            setError(`ログインに失敗しました。${res?.error}`);
        }
    }

    return (
        <>
            <h2>ログイン</h2>
            <form onSubmit={(e) => handleSubmit(e)} className="form">
                <label>
                    ユーザー名<br />
                    <input 
                        type="text"
                        id="name"
                        className="input"
                        placeholder='ユーザー名'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    パスワード<br />
                    <input
                        type="password"
                        id="password"
                        className="input"
                        placeholder='パスワード'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                </label>
                <br />
                <input type="submit" className="submit-btn" value="ログイン"/>
            </form>

            <Link href={"/"}>
                パスワードを忘れた方はこちら
            </Link>

            <Link href={"/"}>
                アカウントを作成する
            </Link>
            <div>{error}</div>
        </>
    )
}

export default LoginPage;