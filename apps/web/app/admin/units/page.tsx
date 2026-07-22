import Link from "next/link";

import { getUnitsAction } from "@/src/features/unit/actions";

export default async function UnitsPage() {
  const units = await getUnitsAction();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Units
          </h1>

          <p className="text-muted-foreground">
            Manage all units.
          </p>
        </div>

        <Link
          href="/admin/units/new"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          New Unit
        </Link>
      </div>

      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">
                Unit
              </th>

              <th className="p-3 text-left">
                Number
              </th>

              <th className="p-3 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {units.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-6 text-center text-muted-foreground"
                >
                  No units found.
                </td>
              </tr>
            ) : (
              units.map((unit) => (
                <tr
                  key={unit.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {unit.title}
                  </td>

                  <td className="p-3">
                    {unit.unitNumber}
                  </td>

                  <td className="p-3">
                    {unit.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}