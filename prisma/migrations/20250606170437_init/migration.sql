-- CreateTable
CREATE TABLE "PurcheseInstallment" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "numberInstallments" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurcheseInstallment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Installment" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "purchaseInstallmentId" INTEGER NOT NULL,

    CONSTRAINT "Installment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "availableLimit" DOUBLE PRECISION NOT NULL DEFAULT 2700,
    "totalLimit" DOUBLE PRECISION NOT NULL,
    "spendingLimit" DOUBLE PRECISION NOT NULL DEFAULT 800,
    "amountUsedSpendingLimit" DOUBLE PRECISION NOT NULL,
    "valueAvailableUse" DOUBLE PRECISION NOT NULL,
    "amountPay" DOUBLE PRECISION NOT NULL,
    "monthReference" VARCHAR(7) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Installment" ADD CONSTRAINT "Installment_purchaseInstallmentId_fkey" FOREIGN KEY ("purchaseInstallmentId") REFERENCES "PurcheseInstallment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
