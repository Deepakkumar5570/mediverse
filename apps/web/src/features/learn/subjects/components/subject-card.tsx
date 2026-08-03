import { ExplorerCard } from "@/src/components/learn";

type Subject = {
    id: string;
    name: string;
    code: string | null;
};

type Props = {
    subject: Subject;
    programSlug: string;
    semesterId: string;
};

export function SubjectCard({
    subject,
    programSlug,
    semesterId,
}: Props) {
    return (
        <ExplorerCard
            href={`/learn/programs/${programSlug}/semesters/${semesterId}/subjects/${subject.id}`}
            title={subject.name}
            description={subject.code ?? "Subject"}
        />
    );
}