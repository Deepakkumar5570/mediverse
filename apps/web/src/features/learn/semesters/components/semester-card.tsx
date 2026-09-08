import { ExplorerCard } from "@/src/components/learn";

type Semester = {
    id: string;
    number: number;
    name: string;
};

type Props = {
    semester: Semester;
    hrefSuffix?: string;
};

export function SemesterCard({
    semester,
    hrefSuffix = "",
}: Props) {
    return (
        <ExplorerCard
            href={`/learn/semesters/${semester.id}${hrefSuffix}`}
            title={semester.name}
            description={`Semester ${semester.number}`}
        />
    );
}