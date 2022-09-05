/*
  Warnings:

  - You are about to drop the column `finishDate` on the `Task` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "finishDate",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;
