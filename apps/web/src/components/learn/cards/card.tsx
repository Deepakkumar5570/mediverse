import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
}