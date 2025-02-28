'use client'

import Image from "next/image"
import Link from "next/link"
import { Form } from "../components/Form"
import "../../styles/addCard.css"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AddCardPagination } from "../components/addCardPagination"
import { useRouter } from "next/navigation"

export default function AddCardPage() {

    const router = useRouter();
    const [ cardData, setCardData] = useState<Card[]>([]);//DBから取得したカード情報を管理
    const [ totalPages, setTotalPages ] = useState(1);//カードを表示するのに必要なページ数を管理
    const [ currentPage, setCurrentPage ] = useState(1);//現在のページ数を管理
    const searchParams = useSearchParams();

    //初回レンダリング・パラメータが変更されたときに実行される。
    useEffect(() => {
        /**
         * 現在のページ数をサーバーに送信し、そのページに表示するカード情報を取得する。
         * @param page 現在のページ数
         */
        const fetchData = async (page: number) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/card?page=${page}`);//DBからカード情報を取得するAPIを叩く

            if(res.ok) {
                const data = await res.json();
                setCardData(data.data);//カード情報
                setCurrentPage(data.currentPage);//現在のページ数
                setTotalPages(data.totalPages);//必要なページ数
            } else {
                alert(`エラー：${await res.json()}`);
            }
        }

        const page = parseInt(searchParams.get('page') || '1', 10);//パラメータから現在のページ数を取得
        fetchData(page);
    }, [searchParams]);

    const handleServerResponse = (data: Card[]) => {
        setCardData(data)
    };

    //ページネーションの「次へ」「前へ」「番号」クリック時対象ページに遷移
    const pageChangeHandle = (page: number) => {
        router.push(`/addCard/?page=${page}`);
        setCurrentPage(page);
    };

    return (
        <main>
            <Link href={"/"} className="back">＜ トップページに戻る</Link>
            <div className="hed">
                <h2>
                    コレクションに追加したいカードを登録
                </h2>
                <Form onServerResponse={(data: Card[]) => handleServerResponse(data)}/>
            </div>
            <ul className="card-list">
                {cardData?.map((card) => (
                    <li className="card-item" key={card.cardId}>
                    <div className="image-area">
                        <Image
                        className="card-image"
                        src={card.cardImage}
                        alt={card.cardName + card.rarity + card.cardId}
                        width={100}
                        height={140}
                        />
                    </div>
                    <p>{`${card.cardName} 【${card.rarity}】`}</p>
                    <div className="price-area">
                        <p className="sale">{`販売${card.Sales_price}`}</p>
                        <p className="purchase">{`買取${card.Purchase_price}`}</p>
                    </div>
                    <button className="add-btn">
                        登録する
                    </button>
                    </li>
                ))}
            </ul>
            <AddCardPagination totalPages={totalPages} currentPage={currentPage} pageChangeHandle={(page) => pageChangeHandle(page)}/>
        </main>
    )
}