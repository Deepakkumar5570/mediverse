import { ExplorerGrid } from "./explorer-grid";

export function ExplorerLoading() {
    return (
        <ExplorerGrid>
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="h-56 animate-pulse rounded-xl border bg-gray-100"
                />
            ))}
        </ExplorerGrid>
    );
}