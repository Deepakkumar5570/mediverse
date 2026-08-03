import { ExplorerCard } from "@/src/components/learn";

type Semester = {
    id: string;
    number: number;
    name: string;
    // slug: string;
};

type Props = {
    semester: Semester;
    programSlug: string;
};

export function SemesterCard({
    semester,
    programSlug,
}: Props) {
    return (
        <ExplorerCard
            // href={`/learn/programs/${programSlug}/semesters/${semester.slug}`}
            href={`/learn/programs/${programSlug}/semesters/${semester.id}`}
            title={semester.name}
            description={`Semester ${semester.number}`}
        />
    );
}