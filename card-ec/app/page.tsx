'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Header from "./components/Header"
import "../styles/page.css"
import { User, Card } from './api/types/types'

export default function Home() {

  const { data: session, status } = useSession();
  const [ user, setUser] = useState(session?.user as User);

  

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getRegisterCard`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: user.id
            }),
          });

          if(!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`)
          }
  
          const cardsData = await res.json();
          console.log(cardsData);

        } catch(e) {
          console.error('Error fetching cards:', e);
        }
        
      }
    }

    fetchData();

  },[user]);

  return (
    <>
      <Header />
      <main className="main">
        <div className="main-inner">
          <div className="main-left">
            <div className="content-hed">
              <h2>コレクションカード一覧</h2>
              <Link href={"/addCard"} className="add-btn">
                カードを追加
              </Link>
            </div>
            <table className="collection-table">
              <thead>
                <tr>
                  <th className="card-name">
                    <p>カード名</p>
                  </th>
                  <th className="rarity">
                    <p>レアリティ</p>
                  </th>
                  <th className="product-num">
                    <p>型番</p>
                  </th>
                  <th className="price">
                    <p>相場</p>
                  </th>
                  <th className="delete">

                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
                <tr>
                  <td className="card-name">ピカチュウ ex</td>
                  <td className="rarity">sar</td>
                  <td className="product-num">111/111</td>
                  <td className="price">￥10000</td>
                  <td className="delete">
                    <button>削除</button>
                  </td>
                </tr>
              </tbody>
            </table>
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
          </div>
          <div className="main-right">
            <div className="price-sum-area">
              <p className="text">コレクション数：100枚</p>
              <p className="text">前日比：+10000円</p>
              <p className="price-sum-text">合計：100000000円</p>
            </div>
            {/* <Form onServerResponse={(data: Card[]) => handleServerResponse(data)}/> */}
          </div>
        </div>
      </main>
    </>
  );
}

