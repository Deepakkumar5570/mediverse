import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export function ExplorerGrid({
    children,
}: Props) {
    return (
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {children}
        </section>
    );
}