import { getContentsAction } from "../../../src/features/content/actions/get-contents";

export default async function ContentsPage() {
    const contents = await getContentsAction();

    return (
        <main className="mx-auto max-w-7xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Contents
                </h1>

                <a
                    href="/admin/contents/new"
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                    + New Content
                </a>
            </div>

            {contents.length === 0 ? (
                <div className="rounded border p-10 text-center text-gray-500">
                    No content found.
                </div>
            ) : (
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3 text-left">
                                Title
                            </th>

                            <th className="border p-3 text-left">
                                Slug
                            </th>

                            <th className="border p-3 text-left">
                                Reading Time
                            </th>

                            <th className="border p-3 text-left">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {contents.map((content) => (
                            <tr key={content.id}>
                                <td className="border p-3">
                                    <a
                                        href={`/admin/contents/${content.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {content.title}
                                    </a>
                                </td>

                                <td className="border p-3">
                                    {content.slug}
                                </td>

                                <td className="border p-3">
                                    {content.readingTime} min
                                </td>

                                <td className="border p-3 capitalize">
                                    {content.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </main>
    );
}