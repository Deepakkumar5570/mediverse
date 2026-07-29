import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";

import {
    contents,
    db,
    programs,
    semesters,
    subjects,
    subtopics,
    topics,
    units,
} from "@mediverse/database";

import { ContentForm } from "../../../../../src/features/content/components/content-form";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditContentPage({
    params,
}: Props) {
    const { id } = await params;

    const [content] = await db
        .select()
        .from(contents)
        .where(eq(contents.id, id));

    if (!content) {
        notFound();
    }

    const [
        programList,
        semesterList,
        subjectList,
        unitList,
        topicList,
        subtopicList,
    ] = await Promise.all([
        db.select().from(programs).orderBy(asc(programs.name)),
        db.select().from(semesters).orderBy(asc(semesters.number)),
        db.select().from(subjects).orderBy(asc(subjects.name)),
        db.select().from(units).orderBy(asc(units.unitNumber)),
        db.select().from(topics).orderBy(asc(topics.topicNumber)),
        db.select().from(subtopics).orderBy(asc(subtopics.subtopicNumber)),
    ]);

    return (
        <main className="mx-auto max-w-6xl space-y-6 p-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Edit Content
                </h1>

                <p className="text-gray-500">
                    Update existing content.
                </p>
            </div>

            <ContentForm
                programs={programList}
                semesters={semesterList}
                subjects={subjectList}
                units={unitList}
                topics={topicList}
                subtopics={subtopicList}
                initialData={{
                    id: content.id,

                    programId: "",
                    semesterId: "",
                    subjectId: "",
                    unitId: "",
                    topicId: "",

                    subtopicId: content.subtopicId,

                    title: content.title,
                    slug: content.slug,
                    summary: content.summary ?? "",
                    content: content.content,

                    readingTime: content.readingTime,

                    seoTitle: content.seoTitle ?? "",
                    seoDescription:
                        content.seoDescription ?? "",

                    status: content.status as
                        | "draft"
                        | "active"
                        | "archived",
                }}
            />
        </main>
    );
}