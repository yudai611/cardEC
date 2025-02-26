-- CreateTable
CREATE TABLE "Cards" (
    "cardId" TEXT NOT NULL,
    "cardName" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "cardImage" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("cardId")
);

-- CreateTable
CREATE TABLE "User_Card" (
    "userId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "count" TEXT NOT NULL,
    "acquired_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_Card_pkey" PRIMARY KEY ("userId")
);
