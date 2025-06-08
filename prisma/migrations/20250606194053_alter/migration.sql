-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "availableLimit" DROP DEFAULT,
ALTER COLUMN "totalLimit" SET DEFAULT 2700;
