import { ExplorerCard } from "@/src/components/learn";

type Topic = {
    id: string;
    title: string;
    topicNumber: number;
};

type Props = {
    topic: Topic;
};

export function TopicCard({
    topic,
}: Props) {
    return (
        <ExplorerCard
            href={`/learn/topics/${topic.id}`}
            title={topic.title}
            description={`Topic ${topic.topicNumber}`}
        />
    );
}