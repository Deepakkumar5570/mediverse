import Link from "next/link";

export type SidebarItem = {
  label: string;
  href: string;
};

type Props = {
  title?: string;
  items: SidebarItem[];
};

export function Sidebar({
  title = "Navigation",
  items,
}: Props) {
  return (
    <aside className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        {title}
      </h2>

      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-lg px-3 py-2 text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}