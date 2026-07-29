"use client";

type Props = {
    formId: string;
};

export function DeleteContentButton({
    formId,
}: Props) {
    return (
        <button
            type="button"
            className="rounded bg-red-600 px-4 py-2 text-white"
            onClick={() => {
                const ok = window.confirm(
                    "Are you sure you want to delete this content?"
                );

                if (!ok) return;

                const form = document.getElementById(formId);

                if (form instanceof HTMLFormElement) {
                    form.requestSubmit();
                }
            }}
        >
            Delete
        </button>
    );
}