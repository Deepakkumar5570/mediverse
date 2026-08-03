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
};

export function PageTemplate({
  title,
  description,
  breadcrumbs,
  sidebarTitle = "Learn",
  sidebar,
  children,
}: Props) {
  return (
    <LearnLayout>
      <Breadcrumb items={breadcrumbs} />

      <PageHeader
        title={title}
        description={description}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <Sidebar
            title={sidebarTitle}
            items={sidebar}
          />
        </aside>

        <section className="lg:col-span-9">
          {children}
        </section>
      </div>
    </LearnLayout>
  );
}