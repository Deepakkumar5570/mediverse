import { ExplorerCard } from "@/src/components/learn";

type Program = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
};

type Props = {
    program: Program;
};

export function ProgramCard({
    program,
}: Props) {
    return (
        <ExplorerCard
            href={`/learn/programs/${program.slug}`}
            title={program.name}
            description={program.description}
        />
    );
}