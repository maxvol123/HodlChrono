-- CreateTable
CREATE TABLE "CryptoReviews" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageurl" TEXT NOT NULL,
    "prediction" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "CryptoReviews_pkey" PRIMARY KEY ("id")
);
