import { ExplorerPage } from "@/src/components/learn";

import {
  getProgramsAction,
  ProgramCard,
} from "../../../src/features/learn/programs";

export default async function ProgramsPage() {
  const programs = await getProgramsAction();

  return (
    <ExplorerPage
      title="Browse Programs"
      description="Choose your academic program to begin learning."
      items={programs}
      emptyTitle="No Programs Available"
      emptyDescription="Programs will appear here once they are created in the Admin CMS."
      renderItem={(program) => (
        <ProgramCard
          key={program.id}
          program={program}
        />
      )}
    />
  );
}