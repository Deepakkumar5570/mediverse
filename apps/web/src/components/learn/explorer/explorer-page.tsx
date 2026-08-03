import { ReactNode } from "react";

import {
    LearnLayout,
    PageHeader,
} from "@/src/components/learn";

import { ExplorerEmpty } from "./explorer-empty";
import { ExplorerGrid } from "./explorer-grid";

type Props<T> = {
    title: string;
    description?: string | null;

    items: T[];

    emptyTitle: string;
    emptyDescription: string;

    renderItem: (item: T) => ReactNode;
};

export function ExplorerPage<T>({
    title,
    description,
    items,
    emptyTitle,
    emptyDescription,
    renderItem,
}: Props<T>) {
    return (
        <LearnLayout>
            <PageHeader
                title={title}
                description={description}
            />

            <div className="mt-10">
                {items.length === 0 ? (
                    <ExplorerEmpty
                        title={emptyTitle}
                        description={emptyDescription}
                    />
                ) : (
                    <ExplorerGrid>
                        {items.map(renderItem)}
                    </ExplorerGrid>
                )}
            </div>
        </LearnLayout>
    );
}