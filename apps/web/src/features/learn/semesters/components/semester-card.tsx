import { ExplorerCard } from "@/src/components/learn";

type Semester = {
    id: string;
    number: number;
    name: string;
};

type Props = {
    semester: Semester;
};

export function SemesterCard({
    semester,
}: Props) {
    return (
        <ExplorerCard
            href={`/learn/semesters/${semester.id}`}
            title={semester.name}
            description={`Semester ${semester.number}`}
        />
    );
}