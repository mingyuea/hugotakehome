-- CreateTable
CREATE TABLE "Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isComplete" BOOLEAN,
    "firstname" TEXT,
    "lastname" TEXT,
    "dob" NUMERIC,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" INTEGER,
    "vehiclevin1"  TEXT,
    "vehicleyear1" INTEGER,
    "vehiclemake1" TEXT,
    "vehiclevin2" TEXT,
    "vehicleyear2" INTEGER,
    "vehiclemake2" TEXT,
    "vehiclevin3"  TEXT,
    "vehicleyear3" INTEGER,
    "vehiclemake3" TEXT,
    "price" INTEGER
);
