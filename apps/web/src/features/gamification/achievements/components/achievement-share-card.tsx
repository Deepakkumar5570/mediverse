"use client";

import { useEffect, useRef, useState } from "react";

import type { AchievementDetail } from "./achievement-detail-modal";

type Props = {
    achievement: AchievementDetail;
    userName: string;
    onClose: () => void;
};

function formatDate(
    value: Date | string,
) {
    const date =
        value instanceof Date
            ? value
            : new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Recently";
    }

    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        },
    ).format(date);
}

function drawAchievementCard(
    canvas: HTMLCanvasElement,
    achievement: AchievementDetail,
    userName: string,
) {
    const width = 1200;
    const height = 630;

    canvas.width = width;
    canvas.height = height;

    const context =
        canvas.getContext("2d");

    if (!context) {
        return;
    }

    /*
     * Background
     */
    const gradient =
        context.createLinearGradient(
            0,
            0,
            width,
            height,
        );

    gradient.addColorStop(
        0,
        "#4f46e5",
    );

    gradient.addColorStop(
        0.5,
        "#6366f1",
    );

    gradient.addColorStop(
        1,
        "#7c3aed",
    );

    context.fillStyle = gradient;
    context.fillRect(
        0,
        0,
        width,
        height,
    );

    /*
     * Decorative circles
     */
    context.globalAlpha = 0.1;

    context.beginPath();
    context.arc(
        1040,
        90,
        180,
        0,
        Math.PI * 2,
    );
    context.fillStyle = "#ffffff";
    context.fill();

    context.beginPath();
    context.arc(
        110,
        560,
        150,
        0,
        Math.PI * 2,
    );
    context.fill();

    context.globalAlpha = 1;

    /*
     * Brand
     */
    context.fillStyle = "#ffffff";
    context.font =
        "700 30px Arial, sans-serif";
    context.fillText(
        "MediVerse",
        70,
        75,
    );

    context.fillStyle =
        "rgba(255,255,255,0.7)";
    context.font =
        "500 15px Arial, sans-serif";
    context.fillText(
        "LEARN • EXPLORE • GROW",
        70,
        101,
    );

    /*
     * Achievement icon
     */
    context.fillStyle = "#ffffff";
    context.beginPath();
    context.roundRect(
        70,
        155,
        105,
        105,
        [24, 24],
    );
    context.fill();

    context.font =
        "56px Arial, sans-serif";

    context.textAlign = "center";
    context.textBaseline = "middle";

    context.fillText(
        achievement.icon,
        122,
        208,
    );

    context.textAlign = "left";
    context.textBaseline = "alphabetic";

    /*
     * Label
     */
    context.fillStyle =
        "rgba(255,255,255,0.7)";
    context.font =
        "700 17px Arial, sans-serif";

    context.fillText(
        "ACHIEVEMENT UNLOCKED",
        210,
        180,
    );

    /*
     * Title
     */
    context.fillStyle = "#ffffff";
    context.font =
        "900 48px Arial, sans-serif";

    context.fillText(
        achievement.title,
        210,
        235,
    );

    context.fillStyle = "#ffffff";
    context.font =
        "700 28px Arial, sans-serif";

    context.fillText(
        userName,
        70,
        305,
    );

    /*
     * Description
     */
    context.fillStyle =
        "rgba(255,255,255,0.88)";
    context.font =
        "400 22px Arial, sans-serif";

    const description =
        achievement.description;

    context.fillText(
        description.slice(0, 85),
        70,
        365,
    );

    /*
     * Reward
     */
    if (achievement.xpReward > 0) {
        context.fillStyle = "#ffffff";

        context.beginPath();
        context.roundRect(
            70,
            415,
            180,
            58,
            [18, 18],
        );
        context.fill();

        context.fillStyle = "#4f46e5";
        context.font =
            "900 23px Arial, sans-serif";

        context.fillText(
            `+${achievement.xpReward} XP`,
            100,
            452,
        );
    }

    /*
     * Date
     */
    context.fillStyle =
        "rgba(255,255,255,0.7)";
    context.font =
        "500 17px Arial, sans-serif";

    context.fillText(
        `Earned ${formatDate(
            achievement.unlockedAt,
        )}`,
        70,
        525,
    );

    /*
     * Footer
     */
    context.fillStyle =
        "rgba(255,255,255,0.7)";
    context.font =
        "600 18px Arial, sans-serif";

    context.fillText(
        "Keep Learning. Keep Growing.",
        70,
        585,
    );

    context.textAlign = "right";

    context.fillStyle =
        "rgba(255,255,255,0.55)";
    context.font =
        "500 15px Arial, sans-serif";

    context.fillText(
        "MediVerse",
        1130,
        585,
    );

    context.textAlign = "left";
}

export function AchievementShareCard({
    achievement,
    userName,
    onClose,
}: Props) {
    const canvasRef =
        useRef<HTMLCanvasElement | null>(
            null,
        );

    const [sharing, setSharing] =
        useState(false);

    const [message, setMessage] =
        useState("");

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        drawAchievementCard(
            canvasRef.current,
            achievement,
            userName,
        );
    }, [achievement, userName]);

    function downloadCard() {
        const canvas =
            canvasRef.current;

        if (!canvas) {
            return;
        }

        const link =
            document.createElement("a");

        link.download = `mediverse-${achievement.achievementKey}.png`;

        link.href =
            canvas.toDataURL("image/png");

        link.click();

        setMessage(
            "Achievement card downloaded.",
        );
    }

    async function shareCard() {
        const canvas =
            canvasRef.current;

        if (!canvas) {
            return;
        }

        setSharing(true);
        setMessage("");

        try {
            const blob =
                await new Promise<Blob | null>(
                    (resolve) =>
                        canvas.toBlob(
                            resolve,
                            "image/png",
                        ),
                );

            if (!blob) {
                throw new Error(
                    "Unable to create image.",
                );
            }

            const file = new File(
                [blob],
                `mediverse-${achievement.achievementKey}.png`,
                {
                    type: "image/png",
                },
            );

            if (
                navigator.share &&
                navigator.canShare?.({
                    files: [file],
                })
            ) {
                await navigator.share({
                    title: `${achievement.title} | MediVerse`,
                    text: `I unlocked "${achievement.title}" on MediVerse! 🏆`,
                    files: [file],
                });

                setMessage("Shared successfully.");
            } else {
                downloadCard();

                setMessage(
                    "Image saved. You can share it anywhere.",
                );
            }
        } catch (error) {
            if (
                error instanceof DOMException &&
                error.name === "AbortError"
            ) {
                return;
            }

            console.error(
                "Failed to share achievement:",
                error,
            );

            setMessage(
                "Sharing is unavailable. Download the card instead.",
            );
        } finally {
            setSharing(false);
        }
    }

    async function copyAchievement() {
        const text =
            `🏆 Achievement Unlocked: ${achievement.title}\n\n` +
            `${achievement.description}\n\n` +
            `${achievement.xpReward > 0
                ? `+${achievement.xpReward} XP\n`
                : ""
            }` +
            `MediVerse — Keep Learning. Keep Growing.`;

        try {
            await navigator.clipboard.writeText(
                text,
            );

            setMessage(
                "Achievement copied to clipboard.",
            );
        } catch (error) {
            console.error(
                "Failed to copy achievement:",
                error,
            );

            setMessage(
                "Could not copy achievement.",
            );
        }
    }

    function shareLinkedIn() {
        const text = encodeURIComponent(
            `I just unlocked "${achievement.title}" on MediVerse! 🏆`,
        );

        window.open(
            `https://www.linkedin.com/feed/?shareActive=true&text=${text}`,
            "_blank",
            "noopener,noreferrer",
        );
    }

    function shareX() {
        const text = encodeURIComponent(
            `I just unlocked "${achievement.title}" on MediVerse! 🏆\n\nKeep Learning. Keep Growing.`,
        );

        window.open(
            `https://twitter.com/intent/tweet?text=${text}`,
            "_blank",
            "noopener,noreferrer",
        );
    }

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm">
            <div className="my-8 w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                            Share Achievement
                        </p>

                        <h2 className="mt-1 text-lg font-black text-slate-950">
                            Your MediVerse card
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition hover:bg-slate-200"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                {/* Card Preview */}
                <div className="bg-slate-100 p-4 sm:p-6">
                    <div className="overflow-hidden rounded-2xl shadow-lg">
                        <canvas
                            ref={canvasRef}
                            className="block h-auto w-full"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="p-5 sm:p-6">
                    {message && (
                        <div className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                            {message}
                        </div>
                    )}

                    <div className="grid gap-3 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={downloadCard}
                            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                        >
                            Download Card
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                void shareCard()
                            }
                            disabled={sharing}
                            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {sharing
                                ? "Sharing..."
                                : "Share"}
                        </button>

                        <button
                            type="button"
                            onClick={shareLinkedIn}
                            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                        >
                            Share on LinkedIn
                        </button>

                        <button
                            type="button"
                            onClick={shareX}
                            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                        >
                            Share on X
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                void copyAchievement()
                            }
                            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 sm:col-span-2"
                        >
                            Copy Achievement
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-4 w-full rounded-xl px-5 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}