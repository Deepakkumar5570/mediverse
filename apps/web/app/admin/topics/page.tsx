import Link from "next/link";

import { getTopicsAction } from "@/src/features/topic/actions";

export default async function TopicsPage() {
  const topics = await getTopicsAction();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Topics
          </h1>

          <p className="text-muted-foreground">
            Manage all topics.
          </p>
        </div>

        <Link
          href="/admin/topics/new"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          New Topic
        </Link>
      </div>

      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">
                Topic
              </th>

              <th className="p-3 text-left">
                Number
              </th>

              <th className="p-3 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {topics.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-6 text-center text-muted-foreground"
                >
                  No topics found.
                </td>
              </tr>
            ) : (
              topics.map((topic) => (
                <tr
                  key={topic.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {topic.title}
                  </td>

                  <td className="p-3">
                    {topic.topicNumber}
                  </td>

                  <td className="p-3">
                    {topic.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}