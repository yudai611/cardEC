'use client'

import "../../styles/form.css"
import React, { useState } from "react"

export const Form = ( {onServerResponse}:  { onServerResponse: (cardsData: Card[]) => void }) => {
    const [value, setValue] = useState("");

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/searchCard`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                value: value
            }),
        });

        if(res.ok) {
            const cardsData = await res.json();
            onServerResponse(cardsData);
        } else {
            const cardsData = await res.json();
            alert(cardsData)
        }
    }

    const changeHandler = (e: string) => {
        setValue(e)
    }

    return (
        <form action="/" onSubmit={(e) => onSubmitHandler(e)}>
              <input type="text" placeholder="カード検索" className="name-input" value={value} onChange={(e) => changeHandler(e.target.value)}/>
              <input type="submit" value={"検索"} className="submit-btn"/>
        </form>
    )
}