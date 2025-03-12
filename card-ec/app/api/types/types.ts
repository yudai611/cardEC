type Card = {
    cardId: string,
    cardName: string,
    rarity: string,
    cardImage: string,
    Purchase_price: string,
    Sales_price: string,
    created_at: Date,
    updated_at: Date
}

type User = {
    id: string,
    name: string,
    email: string,
    password: string
}

export type { User, Card }