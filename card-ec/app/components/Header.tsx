'use client'

import Image from "next/image";
import Link from "next/link";
import "../../styles/header.css"

export default function Header() {

    return (
        <>
            <header className="header">
                <div className="header-inner">
                    <div className="header-left">
                        <Image
                            width={85}
                            height={85}
                            alt="logo"
                            src={"/logo/pokemon-1536847_1280.png"}
                        />
                        <Image
                            width={140}
                            height={80}
                            alt="logo"
                            src={"/logo/IMG_7232.png"}
                        />
                    </div>
                    <div className="header-right">
                        <div className="login-area">
                            <Link
                                href={"/login"}
                                className="login-btn btn"
                            >
                                ログイン
                            </Link>
                            <Link
                                href={`/signUp`}
                                className="btn"
                            >
                                新規登録
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}