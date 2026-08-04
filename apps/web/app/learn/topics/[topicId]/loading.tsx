
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

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-36 rounded-xl"
                    />
                ))}
            </div>
        </main>
    );
}