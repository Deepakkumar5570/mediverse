import { ReactNode } from "react";

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export function Section({
  title,
  description,
  children,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-8 shadow-sm">
      {(title || description) && (
        <header className="mb-6">
          {title && (
            <h2 className="text-2xl font-semibold">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-2 text-gray-600">
              {description}
            </p>
          )}
        </header>
      )}

      {children}
    </section>
  );
}