import { ExplorerCard } from "@/src/components/learn";

type Subject = {
    id: string;
    name: string;
    code: string | null;
};

type Props = {
    subject: Subject;
    hrefSuffix?: string;
};

export function SubjectCard({
    subject,
    hrefSuffix = "",
}: Props) {
    return (
        <ExplorerCard
            href={`/learn/subjects/${subject.id}${hrefSuffix}`}
            title={subject.name}
            description={subject.code ?? "Subject"}
        />
    );
}