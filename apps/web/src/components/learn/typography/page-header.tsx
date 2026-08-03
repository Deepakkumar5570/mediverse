type Props = {
  title: string;
  description?: string | null;
};

export function PageHeader({
  title,
  description,
}: Props) {
  return (
    <section className="space-y-3">
      <h1 className="text-4xl font-bold tracking-tight">
        {title}
      </h1>

      {description && (
        <p className="max-w-3xl text-lg text-gray-600">
          {description}
        </p>
      )}
    </section>
  );
}