import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function LearnLayout({
  children,
}: Props) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {children}
    </main>
  );
}