-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_urlid_fkey";

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_urlid_fkey" FOREIGN KEY ("urlid") REFERENCES "Url"("id") ON DELETE CASCADE ON UPDATE CASCADE;
