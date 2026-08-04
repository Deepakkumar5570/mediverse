import { ExplorerCard } from "@/src/components/learn";

type Subject = {
    id: string;
    name: string;
    code: string | null;
};

type Props = {
    subject: Subject;
};

export function SubjectCard({
    subject,
}: Props) {
    return (
        <ExplorerCard
            href={`/learn/subjects/${subject.id}`}
            title={subject.name}
            description={subject.code ?? "Subject"}
        />
    );
}