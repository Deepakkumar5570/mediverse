import { ExplorerCard } from "@/src/components/learn";

type Subtopic = {
    id: string;
    title: string;
    subtopicNumber: number;
};

type Props = {
    subtopic: Subtopic;
};

export function SubtopicCard({
    subtopic,
}: Props) {
    return (
        <ExplorerCard
            href={`/learn/subtopics/${subtopic.id}`}
            title={subtopic.title}
            description={`Subtopic ${subtopic.subtopicNumber}`}
        />
    );
}