ALTER TABLE "semesters"
ADD COLUMN "slug" varchar(120);

UPDATE "semesters" AS s
SET "slug" = p."slug" || '-semester-' || s."number"::text
FROM "programs" AS p
WHERE p."id" = s."program_id"
  AND s."slug" IS NULL;

ALTER TABLE "semesters"
ALTER COLUMN "slug" SET NOT NULL;

ALTER TABLE "semesters"
ADD CONSTRAINT "semesters_slug_unique"
UNIQUE ("slug");