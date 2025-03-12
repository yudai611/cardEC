'use client'

import { useState } from "react"
import "../../styles/signUp.css"
import Link from 'next/link'

const SignUpPage = () => {
    const [ userName, setUserName] = useState('');//入力されているユーザー名を管理
    const [ password, setPassword ] = useState('');//入力されているパスワードを管理
    const [ error, setError ] = useState('');//新規登録失敗時のエラーメッセージを管理

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signUp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                userName: userName,
                password: password
            }),
        });

        if(res.ok) {
            alert('新規登録に成功しました。');
        } else {
            const data = await res.json();
            setError(data);
        }
    }

    //ユーザー名を更新
    const onChangeUserName = (value: string) => {
        setUserName(value);
    }
    
    //パスワードを更新
    const onChangePassword = (value: string) => {
        setPassword(value);
    }

    return (
        <>
            <h2>新規登録</h2>
            <form onSubmit={(e) => handleSubmit(e)} className="form">
                <label>
                    ユーザー名<br />
                    <input 
                        type="text"
                        id="name"
                        className="input"
                        placeholder='ユーザー名'
                        value={userName}
                        onChange={(e) => onChangeUserName(e.target.value)}
                    />
                </label>
                <br />
                <br />
                <label>
                    パスワード<br />
                    <input
                        type="password"
                        id="password"
                        className="input"
                        placeholder='パスワード'
                        value={password}
                        onChange={(e) => onChangePassword(e.target.value)}
                     />
                </label>
                <br />
                <input type="submit" className="submit-btn" value="新規登録"/>
            </form>

            <Link href={"/login"}>ログインはこちら</Link>
        </>
    )
}

export default SignUpPage