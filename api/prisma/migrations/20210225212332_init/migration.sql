-- CreateEnum
CREATE TYPE "Group" AS ENUM ('USER', 'MARKETING', 'ENGINEERING');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "group" "Group" NOT NULL DEFAULT E'USER',
    "state" "State" NOT NULL DEFAULT E'ACTIVE',

    PRIMARY KEY ("id")
);
