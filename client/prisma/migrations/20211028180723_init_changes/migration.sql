/*
  Warnings:

  - You are about to drop the column `orderId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `customerID` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `paymentGateway` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactionStatus` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_id]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_id` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_gateway` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_status` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerID_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_orderId_fkey";

-- DropIndex
DROP INDEX "Invoice_orderId_key";

-- DropIndex
DROP INDEX "Transaction_orderId_key";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "orderId",
ADD COLUMN     "order_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerID",
ADD COLUMN     "customer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Setting" ADD COLUMN     "autoload" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "orderId",
DROP COLUMN "paymentGateway",
DROP COLUMN "transactionId",
DROP COLUMN "transactionStatus",
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "payment_gateway" TEXT NOT NULL,
ADD COLUMN     "transaction_id" VARCHAR(255) NOT NULL,
ADD COLUMN     "transaction_status" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT E'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_order_id_key" ON "Invoice"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_order_id_key" ON "Transaction"("order_id");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
