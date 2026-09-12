import { getProgramsAction } from "@/src/features/program/actions";
import { getSemestersAction } from "@/src/features/semester/actions";
import { getSubjectsAction } from "@/src/features/subject/actions";

import { UnitContentBuilder } from "@/src/features/unit/components";

export default async function UnitBuilderPage() {
  const [programs, semesters, subjects] =
    await Promise.all([
      getProgramsAction(),
      getSemestersAction(),
      getSubjectsAction(),
    ]);

  return (
    <main>
      <UnitContentBuilder
        programs={programs}
        semesters={semesters}
        subjects={subjects}
      />
    </main>
  );
}