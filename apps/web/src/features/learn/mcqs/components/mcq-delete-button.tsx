"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteMcqAction } from "../actions";

type Props = {
  id: string;
};

export function MCQDeleteButton({
  id,
}: Props) {
  const router = useRouter();
  const [deleting, setDeleting] =
    useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this MCQ?",
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);

    try {
      await deleteMcqAction(id);
      router.push("/admin/mcqs");
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}