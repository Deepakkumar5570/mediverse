// import { getContentsAction } from "../../../src/features/content/actions/get-contents";
// import {
//     getContentsAction,
//     searchContentsAction,
// } from "../../../src/features/content/actions";
import {
    getContentsByStatusAction,
    getPaginatedContentsAction,
    searchContentsAction,
} from "../../../src/features/content/actions";

type Props = {
    searchParams: Promise<{
        search?: string;
        page?: string;
        status?: "draft" | "active" | "archived";
    }>;
};

export default async function ContentsPage({
    searchParams,
}: Props) {
    // const { search = "" } = await searchParams;
    const {
        search = "",
        page = "1",
        status = "active",
    } = await searchParams;

    const currentPage = Number(page) || 1;


    const pagination = await getPaginatedContentsAction(
        currentPage,
        10
    );

    let contents = pagination.items;

    if (search) {
        contents = await searchContentsAction(search);
    } else if (status) {
        contents = await getContentsByStatusAction(status);
    }


    const isSearching = search.trim().length > 0;

    const totalPages = pagination.totalPages;
    const hasPrevious = currentPage > 1;
    const hasNext = currentPage < totalPages;

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


                <div className="mt-4 flex gap-2">
                    <a
                        href="/admin/contents"
                        className={`rounded border px-3 py-2 ${!status ? "bg-blue-600 text-white" : ""
                            }`}
                    >
                        All
                    </a>

                    <a
                        href="/admin/contents?status=active"
                        className={`rounded border px-3 py-2 ${status === "active"
                            ? "bg-green-600 text-white"
                            : ""
                            }`}
                    >
                        Active
                    </a>

                    <a
                        href="/admin/contents?status=draft"
                        className={`rounded border px-3 py-2 ${status === "draft"
                            ? "bg-yellow-500 text-white"
                            : ""
                            }`}
                    >
                        Draft
                    </a>

                    <a
                        href="/admin/contents?status=archived"
                        className={`rounded border px-3 py-2 ${status === "archived"
                            ? "bg-gray-700 text-white"
                            : ""
                            }`}
                    >
                        Archived
                    </a>
                </div>


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
                    {status
                        ? `No ${status} content found.`
                        : isSearching
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
            {!isSearching && totalPages > 1 && (
                <div className="mt-8 flex items-center justify-between">
                    <a
                        href={
                            hasPrevious
                                ? `/admin/contents?page=${currentPage - 1}`
                                : "#"
                        }
                        className={`rounded border px-4 py-2 ${hasPrevious
                            ? "hover:bg-gray-100"
                            : "pointer-events-none opacity-50"
                            }`}
                    >
                        ← Previous
                    </a>

                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>

                    <a
                        href={
                            hasNext
                                ? `/admin/contents?page=${currentPage + 1}`
                                : "#"
                        }
                        className={`rounded border px-4 py-2 ${hasNext
                            ? "hover:bg-gray-100"
                            : "pointer-events-none opacity-50"
                            }`}
                    >
                        Next →
                    </a>
                </div>
            )}
        </main>
    );
}