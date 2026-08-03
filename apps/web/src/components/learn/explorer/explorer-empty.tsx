import { EmptyState } from "@/src/components/learn";

type Props = {
    title: string;
    description: string;
};

export function ExplorerEmpty({
    title,
    description,
}: Props) {
    return (
        <EmptyState
            title={title}
            description={description}
        />
    );
}