"use client";

import { useEffect } from "react";

type Props = {
  title: string;
  slug: string;
  onChange: (slug: string) => void;
};

export function AutoSlug({
  title,
  slug,
  onChange,
}: Props) {
  useEffect(() => {
    const generated = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    // Only update when the slug actually changes
    if (generated !== slug) {
      onChange(generated);
    }
  }, [title, slug]); // <-- Remove onChange from dependencies

  return (
    <input
      className="w-full rounded border p-2"
      value={slug}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Slug"
    />
  );
}