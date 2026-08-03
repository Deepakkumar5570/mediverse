type Props = {
  label: string;
  value: number | string;
};

export function StatCard({
  label,
  value,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="text-3xl font-bold">
        {value}
      </div>

      <div className="mt-2 text-sm text-gray-500">
        {label}
      </div>
    </div>
  );
}