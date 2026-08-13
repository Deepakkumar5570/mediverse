"use client";

import { useState } from "react";

type Flashcard = {
    id: string;
    question: string;
    answer: string;
    cardNumber: number;
};

type Props = {
    flashcards: Flashcard[];
};

export function FlashcardDeck({ flashcards }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    if (flashcards.length === 0) {
        return (
            <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
                No flashcards available.
            </div>
        );
    }

    const currentCard = flashcards[currentIndex];

    function goToPrevious() {
        setFlipped(false);
        setCurrentIndex((index) => Math.max(index - 1, 0));
    }

    function goToNext() {
        setFlipped(false);
        setCurrentIndex((index) =>
            Math.min(index + 1, flashcards.length - 1),
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium">
                        Flashcard {currentIndex + 1} of{" "}
                        {flashcards.length}
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Card #{currentCard.cardNumber}
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={() => setFlipped((value) => !value)}
                className="w-full rounded-xl border bg-white p-8 text-left shadow-sm transition hover:shadow-md"
                aria-label={
                    flipped
                        ? "Show question"
                        : "Show answer"
                }
            >
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                    {flipped ? "Answer" : "Question"}
                </p>

                <div className="min-h-32 flex items-center">
                    <p className="text-lg leading-8">
                        {flipped
                            ? currentCard.answer
                            : currentCard.question}
                    </p>
                </div>

                <p className="mt-6 text-sm text-muted-foreground">
                    Click to {flipped ? "see the question" : "reveal the answer"}.
                </p>
            </button>

            <div className="flex items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                    className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Previous
                </button>

                <div className="text-sm text-muted-foreground">
                    {currentIndex + 1} / {flashcards.length}
                </div>

                <button
                    type="button"
                    onClick={goToNext}
                    disabled={currentIndex === flashcards.length - 1}
                    className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}