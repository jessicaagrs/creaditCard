/*
  Warnings:

  - A unique constraint covering the columns `[monthReference]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invoice_monthReference_key" ON "Invoice"("monthReference");
