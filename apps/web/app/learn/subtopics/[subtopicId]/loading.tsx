import { Skeleton } from "@/src/components/ui";

export default function Loading() {
    return (
        <main className="mx-auto max-w-7xl space-y-8 p-8">
            <Skeleton className="h-10 w-72" />

            <div className="grid gap-6 md:grid-cols-3">
                <Skeleton className="h-28 rounded-xl" />
                <Skeleton className="h-28 rounded-xl" />
                <Skeleton className="h-28 rounded-xl" />
            </div>

            <Skeleton className="h-40 rounded-xl" />
        </main>
    );
}