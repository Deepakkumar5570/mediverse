"use client";

import { useState } from "react";

import {
    AchievementShareCard,
} from "./achievement-share-card";

export type AchievementDetail = {
    id: string;
    achievementKey: string;
    title: string;
    description: string;
    category: string | null;
    icon: string;
    xpReward: number;
    unlockedAt: Date | string;
};
type Props = {
    achievement: AchievementDetail | null;
    userName: string;
    onClose: () => void;
};

function formatEarnedDate(
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
            month: "long",
            year: "numeric",
        },
    ).format(date);
}

export function AchievementDetailModal({
    achievement,
    userName,
    onClose,
}: Props) {
    const [showShareCard, setShowShareCard] =
        useState(false);

    if (!achievement) {
        return null;
    }

    if (showShareCard) {
        return (
            <AchievementShareCard
                achievement={achievement}
                userName={userName}
                onClose={() =>
                    setShowShareCard(false)
                }
            />
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="achievement-detail-title"
                className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
            >
                {/* Hero */}
                <div className="relative bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 px-6 py-8 text-center text-white">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg text-white transition hover:bg-white/20"
                    >
                        ×
                    </button>

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-lg">
                        {achievement.icon}
                    </div>

                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                        Achievement Unlocked
                    </p>

                    <h2
                        id="achievement-detail-title"
                        className="mt-2 text-2xl font-black tracking-tight"
                    >
                        {achievement.title}
                    </h2>
                </div>

                {/* Details */}
                <div className="p-6">
                    <p className="text-center text-sm leading-6 text-slate-600">
                        {achievement.description}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Earned
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-900">
                                {formatEarnedDate(
                                    achievement.unlockedAt,
                                )}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-indigo-50 p-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                                Reward
                            </p>

                            <p className="mt-1 text-sm font-black text-indigo-700">
                                {achievement.xpReward > 0
                                    ? `+${achievement.xpReward} XP`
                                    : "Achievement"}
                            </p>
                        </div>
                    </div>

                    {achievement.category && (
                        <div className="mt-3 rounded-2xl border border-slate-200 px-4 py-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Category
                                </span>

                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize text-slate-700">
                                    {achievement.category}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="mt-6 flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                setShowShareCard(true)
                            }
                            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                        >
                            Share Achievement
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}