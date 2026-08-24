import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function LearnLayout({
  children,
}: Props) {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {children}
    </main>
  );
}