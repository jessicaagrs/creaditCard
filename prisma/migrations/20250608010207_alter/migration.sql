/*
  Warnings:

  - You are about to drop the `PurcheseInstallment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Installment" DROP CONSTRAINT "Installment_purchaseInstallmentId_fkey";

-- DropTable
DROP TABLE "PurcheseInstallment";

-- CreateTable
CREATE TABLE "PurchaseInstallment" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "numberInstallments" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseInstallment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Installment" ADD CONSTRAINT "Installment_purchaseInstallmentId_fkey" FOREIGN KEY ("purchaseInstallmentId") REFERENCES "PurchaseInstallment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
