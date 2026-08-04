import { ExplorerCard } from "@/src/components/learn";

type Unit = {
    id: string;
    title: string;
    slug: string;
    unitNumber: number;
};

type Props = {
    unit: Unit;
};

export function UnitCard({
    unit,
}: Props) {
    return (
        <ExplorerCard
            href={`/learn/units/${unit.id}`}
            title={unit.title}
            description={`Unit ${unit.unitNumber}`}
        />
    );
}