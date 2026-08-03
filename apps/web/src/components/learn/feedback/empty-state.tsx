type Props = {
  title: string;
  description: string;
};

export function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="rounded-xl border border-dashed p-12 text-center">
      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-3 text-gray-500">
        {description}
      </p>
    </div>
  );
}