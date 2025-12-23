-- CreateTable
CREATE TABLE "CryptoHistory" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION,

    CONSTRAINT "CryptoHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CryptoDailyUpdate" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CryptoDailyUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CryptoHistory_symbol_date_key" ON "CryptoHistory"("symbol", "date");

-- CreateIndex
CREATE UNIQUE INDEX "CryptoDailyUpdate_symbol_key" ON "CryptoDailyUpdate"("symbol");
