'use client'

import Image from "next/image"
import Link from "next/link"
import { Form } from "../components/Form"
import "../../styles/addCard.css"
import { useEffect, useState } from "react"

export default function AddCardPage() {

    let cardsData: Card[] = [];

    const [ cardData, setCardData] = useState<Card[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCard`);

            if(res.ok) {
                const data = await res.json();
                setCardData(data);
            } else {
                const errorData = await res.json();
                alert(errorData);
            }
        }

        fetchData();
    }, []);

    const handleServerResponse = (data: Card[]) => {
        setCardData(data)
    }
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
                {cardData.map((card) => (
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
            <div className="pagination">
              <button>前へ</button>
              <div>
                <button className="num-btn">1</button>
                <button className="num-btn">2</button>
                <button className="num-btn">3</button>
                <button className="num-btn">4</button>
              </div>
              <button>次へ</button>
            </div>
        </main>
    )
}