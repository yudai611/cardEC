'use client'

import Image from "next/image"
import Link from "next/link"
import { Form } from "../components/Form"
import "../../styles/addCard.css"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AddCardPagination } from "../components/addCardPagination"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, User } from "../api/types/types"

export default function AddCardPage() {
    const router = useRouter();
    const [cardData, setCardData] = useState<Card[]>([]);//DBから取得したカード情報を管理
    const [totalPages, setTotalPages] = useState(1);//カードを表示するのに必要なページ数を管理
    const [currentPage, setCurrentPage] = useState(1);//現在のページ数を管理
    const [modal, setModal] = useState(false);//モーダルの表示・非表示を管理
    const [ cardId, setCardId ] = useState('');//ユーザーが登録するカードのIDを管理
    const [ count, setCount ] = useState('1')
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const user = session?.user as User;

    //初回レンダリング・パラメータが変更されたときに実行される。
    useEffect(() => {
        /**
         * 現在のページ数をサーバーに送信し、そのページに表示するカード情報を取得する。
         * @param page 現在のページ数
         */
        const fetchData = async (page: number) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCardAddCardPage?page=${page}`);//DBからカード情報を取得するAPIを叩く

            if (res.ok) {
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

    //user_cardテーブル(そのユーザーが登録しているカード情報を保存するテーブル)にデータを保存するAPIを叩く
    const registerHandle = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/registerCard`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cardId: cardId,
                userId: user.id,
                count: count//登録するカードの枚数
            }),
        });

        setModal(false);

        const data = await res.json();
        console.log(data);
    }

    //登録するカードの枚数を指定するセレクトboxを作成するための配列を用意
    const selectNumArray: number[] = [];
    for (let i = 1; i <= 100; i++) {
        selectNumArray.push(i);
    }

    //モーダルが表示されているときは画面スクロールできないようにする
    useEffect(() => {
        if (modal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [modal]);  

    //登録したいカードのIDを引数で受け取り、stateの値を更新およびモーダルを表示する関数
    const setCardIdHandle = async (cardId: string) => {
        setModal(true);
        setCardId(cardId);
    }

    return (
        <main>
            <div className="container">
                <Link href={"/"} className="back">＜ トップページに戻る</Link>
                <div className="hed">
                    <h2>
                        コレクションに追加したいカードを登録
                    </h2>
                    {/*フォームに入力した文字列がカード名に含まれているカード情報を取得するコンポーネント
                       propsに検索情報を元に取得したカードデータを引数として受け取りstateの値を更新する関数を設定。
                    */}
                    <Form onServerResponse={(data: Card[]) => handleServerResponse(data)} />
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
                            <button className="add-btn" onClick={() => setCardIdHandle(card.cardId)}>
                                登録する
                            </button>
                        </li>
                    ))}
                </ul>
                {modal && (
                    <div className="mask">
                        <div className="register-modal">
                            <div className="select-area">
                                枚数：
                                <select className="select-border" onChange={(e) => setCount(e.target.value)}>
                                    {selectNumArray.map((selectNum) => (
                                        <option key={selectNum} value={selectNum}>{selectNum}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="modal-btn-area">
                                <button className="modal-add-btn" onClick={() => registerHandle()}>登録する</button>
                                <button className="modal-close-btn" onClick={() => setModal(false)}>閉じる</button>
                            </div>
                            
                        </div>
                    </div>
                )}
                <AddCardPagination totalPages={totalPages} currentPage={currentPage} pageChangeHandle={(page) => pageChangeHandle(page)} />
            </div>
        </main>
    )
}