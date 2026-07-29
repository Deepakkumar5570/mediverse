"use client";

type Props = {
  value: "draft" | "active" | "archived";
  onChange: (
    value: "draft" | "active" | "archived"
  ) => void;
};

export function StatusSelect({
  value,
  onChange,
}: Props) {
  return (
    <select
      className="w-full rounded border p-2"
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value as
            | "draft"
            | "active"
            | "archived"
        )
      }
    >
      <option value="draft">Draft</option>
      <option value="active">Published</option>
      <option value="archived">Archived</option>
    </select>
  );
}