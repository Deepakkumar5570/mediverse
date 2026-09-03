import { Suspense } from "react";
import { PageTemplate, Section } from "@/src/components/learn";
import { LearnSearch } from "@/src/features/learn/search";

export default function LearnSearchPage() {
    return (
        <PageTemplate
            title="Search"
            description="Find subjects, units, topics, and lessons across MediVerse."
            sidebarTitle="Search"
            breadcrumbs={[
                {
                    label: "Learn",
                    href: "/learn",
                },
                {
                    label: "Search",
                    href: "/learn/search",
                },
            ]}
            sidebar={[
                {
                    label: "Sear    ch",
                    href: "#search",
                },
            ]}
        >
            <Section id="search" title="Search MediVerse">
                <Suspense fallback={<div>Loading search...</div>}>
                    <LearnSearch />
                </Suspense>
            </Section>
        </PageTemplate>
    );
}