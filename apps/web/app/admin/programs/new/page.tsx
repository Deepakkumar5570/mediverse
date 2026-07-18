import { ProgramForm } from "@/src/features/program/components/program-form";

export default function NewProgramPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">
        Create Program
      </h1>

      <p className="mt-2 text-gray-500">
        Add a new medical program.
      </p>

      <div className="mt-8">
        <ProgramForm />
      </div>
    </main>
  );
}