"use client";

import { useEffect } from "react";

type Props = {
  html: string;
  value: number;
  onChange: (minutes: number) => void;
};

export function ReadingTime({
  html,
  value,
  onChange,
}: Props) {
  useEffect(() => {
    const text = html.replace(/<[^>]*>/g, "");

    const words = text
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    const minutes = Math.max(
      1,
      Math.ceil(words / 200)
    );

    // Only update if the calculated value changed
    if (minutes !== value) {
      onChange(minutes);
    }
  }, [html, value]);

  return (
    <input
      readOnly
      className="w-full rounded border bg-gray-100 p-2"
      value={`${value} min`}
    />
  );
}