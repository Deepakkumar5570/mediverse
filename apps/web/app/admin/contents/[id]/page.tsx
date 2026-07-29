import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, contents } from "@mediverse/database";

import { deleteContentAction } from "../../../../src/features/content/actions";
import {
    DeleteContentButton,
} from "../../../../src/features/content/components";

type Props = {
    params: Promise<{
        id: string;
    }>;
};


async function deleteAction(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;

    await deleteContentAction(id);

    redirect("/admin/contents");
}

export default async function ContentDetailsPage({
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

    return (
        <main className="mx-auto max-w-5xl space-y-6 p-6">
            <div>
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {content.title}
                        </h1>

                        <p className="text-gray-500">
                            {content.slug}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <a
                            href={`/admin/contents/${content.id}/edit`}
                            className="rounded bg-blue-600 px-4 py-2 text-white"
                        >
                            Edit
                        </a>

                        <form
                            id="delete-content-form"
                            action={deleteAction}
                        >
                            <input
                                type="hidden"
                                name="id"
                                value={content.id}
                            />
                        </form>

                        <DeleteContentButton
                            formId="delete-content-form"
                        />
                    </div>
                </div>

                <p className="text-gray-500">
                    {content.slug}
                </p>
            </div>

            <div className="rounded border p-4">
                <p>
                    <strong>Status:</strong>{" "}
                    {content.status}
                </p>

                <p>
                    <strong>Reading Time:</strong>{" "}
                    {content.readingTime} min
                </p>
            </div>

            <div>
                <h2 className="mb-2 text-xl font-semibold">
                    Summary
                </h2>

                <p>{content.summary}</p>
            </div>

            <div>
                <h2 className="mb-2 text-xl font-semibold">
                    Content
                </h2>

                <article
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: content.content,
                    }}
                />
            </div>

            <div className="rounded border bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold">
                    SEO
                </h3>

                <p>
                    <strong>SEO Title:</strong>{" "}
                    {content.seoTitle}
                </p>

                <p>
                    <strong>Description:</strong>{" "}
                    {content.seoDescription}
                </p>
            </div>
        </main>
    );
}