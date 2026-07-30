// import { getContentsAction } from "../../../src/features/content/actions/get-contents";
import {
    getContentsAction,
    searchContentsAction,
} from "../../../src/features/content/actions";

type Props = {
    searchParams: Promise<{
        search?: string;
    }>;
};

export default async function ContentsPage({
    searchParams,
}: Props) {
    const { search = "" } = await searchParams;
    const contents = search
        ? await searchContentsAction(search)
        : await getContentsAction();
    const isSearching = search.trim().length > 0;

    return (
        <main className="mx-auto max-w-7xl p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
                <h1 className="text-3xl font-bold">
                    Contents
                </h1>

                <form
                    action="/admin/contents"
                    method="get"
                    className="flex gap-2"
                >
                    <input
                        type="text"
                        name="search"
                        defaultValue={search}
                        placeholder="Search title or slug..."
                        className="rounded border px-3 py-2"
                    />

                    <button
                        type="submit"
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        Search
                    </button>

                    <a
                        href="/admin/contents"
                        className="rounded border px-4 py-2"
                    >
                        Clear
                    </a>
                </form>

                <a
                    href="/admin/contents/new"
                    className="rounded bg-green-600 px-4 py-2 text-white"
                >
                    + New Content
                </a>
            </div>

            {isSearching && (
                <div className="mb-4 rounded border border-blue-200 bg-blue-50 p-3">
                    <p className="text-sm text-blue-700">
                        Found <strong>{contents.length}</strong> result
                        {contents.length !== 1 ? "s" : ""} for{" "}
                        <strong>"{search}"</strong>
                    </p>
                </div>
            )}

            {contents.length === 0 ? (
                <div className="rounded border p-10 text-center text-gray-500">
                    {isSearching
                        ? `No content found for "${search}".`
                        : "No content found."}
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