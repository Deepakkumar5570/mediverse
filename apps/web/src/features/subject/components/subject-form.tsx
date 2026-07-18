"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createSubjectAction } from "../actions";

type Program = {
    id: string;
    name: string;
};

type Props = {
    programs: Program[];
};

export function SubjectForm({ programs }: Props) {
    const router = useRouter();

    const [form, setForm] = useState<{
        programId: string;
        name: string;
        slug: string;
        code: string;
        description: string;
        semester: number;
        status: "active" | "inactive";
    }>({
        programId: "",
        name: "",
        slug: "",
        code: "",
        description: "",
        semester: 1,
        status: "active",
    });
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await createSubjectAction(form);

        router.push("/admin/subjects");
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div>
                <label>Program</label>

                <select
                    className="w-full border rounded p-2"
                    value={form.programId}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            programId: e.target.value,
                        })
                    }
                >
                    <option value="">Select Program</option>

                    {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Name</label>

                <input
                    className="w-full border rounded p-2"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value,
                        })
                    }
                />
            </div>

            <div>
                <label>Slug</label>

                <input
                    className="w-full border rounded p-2"
                    value={form.slug}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            slug: e.target.value,
                        })
                    }
                />
            </div>

            <div>
                <label>Code</label>

                <input
                    className="w-full border rounded p-2"
                    value={form.code}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            code: e.target.value,
                        })
                    }
                />
            </div>

            <div>
                <label>Description</label>

                <textarea
                    className="w-full border rounded p-2"
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value,
                        })
                    }
                />
            </div>

            <div>
                <label>Semester</label>

                <input
                    type="number"
                    min={1}
                    max={12}
                    className="w-full border rounded p-2"
                    value={form.semester}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            semester: Number(e.target.value),
                        })
                    }
                />
            </div>

            <div>
                <label>Status</label>

                <select
                    className="w-full border rounded p-2"
                    value={form.status}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            status: e.target.value as "active" | "inactive",
                        })
                    }
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            <button
                type="submit"
                className="rounded bg-blue-600 text-white px-4 py-2"
            >
                Create Subject
            </button>
        </form>
    );
}