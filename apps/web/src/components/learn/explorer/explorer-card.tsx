import Link from "next/link";
import { ReactNode } from "react";

import { Card } from "@/src/components/learn";

type Props = {
    href: string;
    title: string;
    description?: string | null;
    children?: ReactNode;
};

export function ExplorerCard({
    href,
    title,
    description,
    children,
}: Props) {
    return (
        <Link href={href}>
            <Card className="h-full cursor-pointer">
                <h2 className="text-2xl font-semibold">
                    {title}
                </h2>

                {description && (
                    <p className="mt-3 text-gray-600">
                        {description}
                    </p>
                )}

                {children}

                <div className="mt-6 text-sm font-medium text-blue-600">
                    Explore →
                </div>
            </Card>
        </Link>
    );
}