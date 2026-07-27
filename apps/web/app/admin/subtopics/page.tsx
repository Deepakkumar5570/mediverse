// import { getSubtopicsAction } from "../../../../src/features/subtopic/actions";

import { getSubtopicsAction } from "@/src/features/subtopic/actions/get-subtopics";

export default async function SubtopicsPage() {
  const subtopics = await getSubtopicsAction();

  return (
    <main className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Subtopics</h1>

        <a
          href="/admin/subtopics/new"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Create Subtopic
        </a>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">No.</th>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Slug</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {subtopics.map((subtopic) => (
            <tr key={subtopic.id} className="border-b">
              <td className="p-2">{subtopic.subtopicNumber}</td>
              <td className="p-2">{subtopic.title}</td>
              <td className="p-2">{subtopic.slug}</td>
              <td className="p-2">{subtopic.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}