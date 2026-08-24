import { ReactNode } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  LearnLayout,
  PageHeader,
  Sidebar,
  SidebarItem,
} from "@/src/components/learn";

type Props = {
  title: string;
  description?: string | null;

  breadcrumbs: BreadcrumbItem[];

  sidebarTitle?: string;

  sidebar: SidebarItem[];

  children: ReactNode;

  showHeader?: boolean;

  wide?: boolean;
};

export function PageTemplate({
  title,
  description,
  breadcrumbs,
  sidebarTitle = "Learn",
  sidebar,
  children,
  showHeader = true,
  wide = false,
}: Props) {
  return (
    <LearnLayout>
      {showHeader && (
        <>
          <Breadcrumb items={breadcrumbs} />

          <PageHeader
            title={title}
            description={description}
          />
        </>
      )}

      <div
        className={`mt-10 grid gap-8 lg:grid-cols-12 lg:items-start ${
          wide ? "lg:gap-6" : ""
        }`}
      >
        {/* Sidebar */}
        <aside className="lg:col-span-2">
          <div className="lg:sticky lg:top-24">
            <Sidebar
              title={sidebarTitle}
              items={sidebar}
            />
          </div>
        </aside>

        {/* Main Content */}
        <section
          className={`min-w-0 ${
            wide ? "lg:col-span-10" : "lg:col-span-10"
          }`}
        >
          {children}
        </section>
      </div>
    </LearnLayout>
  );
}