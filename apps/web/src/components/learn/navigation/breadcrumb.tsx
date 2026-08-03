import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({
  items,
}: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500"
    >
      {items.map((item, index) => {
        const last = index === items.length - 1;

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center gap-2"
          >
            {item.href && !last ? (
              <Link
                href={item.href}
                className="hover:text-blue-600"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-900">
                {item.label}
              </span>
            )}

            {!last && (
              <span className="text-gray-400">
                /
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}