"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { createUnitAction } from "../actions";

type Program = {
    id: string;
    name: string;
};

type Semester = {
    id: string;
    programId: string;
    name: string;
    number: number;
};

type Subject = {
    id: string;
    semesterId: string;
    name: string;
};

type Props = {
    programs: Program[];
    semesters: Semester[];
    subjects: Subject[];
};

export function UnitForm({
    programs,
    semesters,
    subjects,
}: Props) {
    const router = useRouter();

    const [form, setForm] = useState({
        programId: "",
        semesterId: "",
        subjectId: "",
        title: "",
        slug: "",
        unitNumber: 1,
        description: "",
        status: "active" as "active" | "inactive",
    });

    const filteredSemesters = useMemo(() => {
        if (!form.programId) return [];

        return semesters.filter(
            (semester) =>
                semester.programId === form.programId
        );
    }, [form.programId, semesters]);

    const filteredSubjects = useMemo(() => {
        if (!form.semesterId) return [];

        return subjects.filter(
            (subject) =>
                subject.semesterId === form.semesterId
        );
    }, [form.semesterId, subjects]);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        await createUnitAction({
            subjectId: form.subjectId,
            title: form.title,
            slug: form.slug,
            unitNumber: Number(form.unitNumber),
            description: form.description,
            status: form.status,
        });

        router.push("/admin/units");
        router.refresh();
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-2xl"
        >
            <div>
                <label className="block mb-1 font-medium">
                    Program
                </label>

                <select
                    className="w-full border rounded p-2"
                    value={form.programId}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            programId: e.target.value,
                            semesterId: "",
                            subjectId: "",
                        })
                    }
                >
                    <option value="">
                        Select Program
                    </option>

                    {programs.map((program) => (
                        <option
                            key={program.id}
                            value={program.id}
                        >
                            {program.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Semester
                </label>

                <select
                    className="w-full border rounded p-2"
                    value={form.semesterId}
                    disabled={!form.programId}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            semesterId: e.target.value,
                            subjectId: "",
                        })
                    }
                >
                    <option value="">
                        Select Semester
                    </option>

                    {filteredSemesters.map((semester) => (
                        <option
                            key={semester.id}
                            value={semester.id}
                        >
                            {semester.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Subject
                </label>

                <select
                    className="w-full border rounded p-2"
                    value={form.subjectId}
                    disabled={!form.semesterId}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            subjectId: e.target.value,
                        })
                    }
                >
                    <option value="">
                        Select Subject
                    </option>

                    {filteredSubjects.map((subject) => (
                        <option
                            key={subject.id}
                            value={subject.id}
                        >
                            {subject.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Unit Title
                </label>

                <input
                    className="w-full border rounded p-2"
                    value={form.title}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            title: e.target.value,
                        })
                    }
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Slug
                </label>

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
                <label className="block mb-1 font-medium">
                    Unit Number
                </label>

                <input
                    type="number"
                    min={1}
                    className="w-full border rounded p-2"
                    value={form.unitNumber}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            unitNumber: Number(e.target.value),
                        })
                    }
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Description
                </label>

                <textarea
                    rows={4}
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
                <label className="block mb-1 font-medium">
                    Status
                </label>

                <select
                    className="w-full border rounded p-2"
                    value={form.status}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            status: e.target.value as
                                | "active"
                                | "inactive",
                        })
                    }
                >
                    <option value="active">
                        Active
                    </option>

                    <option value="inactive">
                        Inactive
                    </option>
                </select>
            </div>

            <button
                type="submit"
                className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
            >
                Create Unit
            </button>
        </form>
    );
}