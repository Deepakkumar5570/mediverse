import Link from "next/link";

import { XpCard } from "@/src/features/gamification";

import { ActivityCalendar } from "./activity-calendar";
import { ProfileHeader } from "./profile-header";
import { ProfileStats } from "./profile-stats";

type ActivityDay = {
    date: string;
    count: number;
    lessonCount: number;
    mcqCount: number;
};

type Props = {
    user: {
        name: string;
        imageUrl: string;
    };

    profile: {
        id: string;
        userId: string;
        username: string | null;
        bio: string | null;
        programId: string | null;
        semesterId: string | null;
        profileVisibility: string;
        programName: string | null;
        semesterName: string | null;
        createdAt: Date;
    };

    summary: {
        total: number;
        completed: number;
        percentage: number;
    };

    continueLearning: any;

    mcqStats: {
        attempted: number;
        correct: number;
        wrong: number;
        accuracy: number;
    };

    activityStats: {
        currentStreak: number;
        longestStreak: number;
        totalActiveDays: number;
        activityDays: ActivityDay[];
    };

    gamificationStats: {
        totalXp: number;
        currentLevel: number;
        currentLevelName: string;
        progress: number;
        xpToNextLevel: number;
        nextLevel: number | null;
        nextLevelName: string | null;
    };
};

export function ProfileDashboard({
    user,
    profile,
    summary,
    continueLearning,
    mcqStats,
    activityStats,
    gamificationStats,
}: Props) {
    const remaining =
        Math.max(
            0,
            summary.total - summary.completed,
        );

    const profileSummary = {
        ...summary,
        remaining,
    };


    return (
        <div className="space-y-8">
            {/* Profile Header */}
            <ProfileHeader
                name={user.name}
                username={profile.username}
                imageUrl={user.imageUrl}
                bio={profile.bio}
                programName={profile.programName}
                semesterName={profile.semesterName}
            />

            {/* XP / Level */}
            <XpCard
                totalXp={gamificationStats.totalXp}
                level={gamificationStats.currentLevel}
                levelName={
                    gamificationStats.currentLevelName
                }
                progress={gamificationStats.progress}
                xpToNextLevel={
                    gamificationStats.xpToNextLevel
                }
                nextLevelName={
                    gamificationStats.nextLevelName
                }
            />

            {/* Learning Stats */}
            <ProfileStats
                summary={profileSummary}
                mcqStats={mcqStats}
            />

            {/* Overall Progress */}
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
                            Learning progress
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                            {summary.percentage}% complete
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            {summary.completed} of{" "}
                            {summary.total} lessons completed.
                        </p>
                    </div>

                    <div className="text-sm font-bold text-slate-500">
                        {remaining} remaining
                    </div>
                </div>

                <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-100">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all"
                        style={{
                            width: `${summary.percentage}%`,
                        }}
                    />
                </div>
            </section>

            {/* Continue Learning */}
            {continueLearning ? (
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
                                Continue learning
                            </p>

                            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                                {continueLearning.subtopicTitle}
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                {continueLearning.topicTitle} ·{" "}
                                {continueLearning.unitTitle}
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                {continueLearning.subjectName} ·{" "}
                                {continueLearning.programName}
                            </p>
                        </div>

                        <Link
                            href={`/learn/subtopics/${continueLearning.subtopicId}`}
                            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                        >
                            Continue Learning →
                        </Link>
                    </div>
                </section>
            ) : (
                <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center">
                    <p className="text-sm font-semibold text-slate-500">
                        Start a lesson to build your learning
                        progress.
                    </p>

                    <Link
                        href="/learn/programs"
                        className="mt-4 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white"
                    >
                        Explore Programs
                    </Link>
                </section>
            )}

            {/* Practice Stats */}
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-600">
                            Practice
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                            Your MCQ performance
                        </h2>
                    </div>

                    <Link
                        href="/learn/practice"
                        className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
                    >
                        Practice now →
                    </Link>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl bg-slate-50 p-5">
                        <p className="text-sm font-semibold text-slate-500">
                            Attempted
                        </p>

                        <p className="mt-2 text-3xl font-black text-slate-950">
                            {mcqStats.attempted}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-emerald-50 p-5">
                        <p className="text-sm font-semibold text-emerald-700">
                            Correct
                        </p>

                        <p className="mt-2 text-3xl font-black text-emerald-700">
                            {mcqStats.correct}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-rose-50 p-5">
                        <p className="text-sm font-semibold text-rose-700">
                            Wrong
                        </p>

                        <p className="mt-2 text-3xl font-black text-rose-700">
                            {mcqStats.wrong}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-indigo-50 p-5">
                        <p className="text-sm font-semibold text-indigo-700">
                            Accuracy
                        </p>

                        <p className="mt-2 text-3xl font-black text-indigo-700">
                            {mcqStats.accuracy}%
                        </p>
                    </div>
                </div>
            </section>

            {/* Streak */}
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
                        Learning streak
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                        Build your learning habit
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        Consistency matters. Keep learning every
                        day to grow your streak.
                    </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-orange-50 p-5">
                        <p className="text-sm font-semibold text-orange-700">
                            Current streak
                        </p>

                        <p className="mt-2 text-3xl font-black text-orange-700">
                            {activityStats.currentStreak}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-orange-600">
                            days
                        </p>
                    </div>

                    <div className="rounded-2xl bg-violet-50 p-5">
                        <p className="text-sm font-semibold text-violet-700">
                            Longest streak
                        </p>

                        <p className="mt-2 text-3xl font-black text-violet-700">
                            {activityStats.longestStreak}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-violet-600">
                            days
                        </p>
                    </div>

                    <div className="rounded-2xl bg-emerald-50 p-5">
                        <p className="text-sm font-semibold text-emerald-700">
                            Active days
                        </p>

                        <p className="mt-2 text-3xl font-black text-emerald-700">
                            {activityStats.totalActiveDays}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-emerald-600">
                            total
                        </p>
                    </div>
                </div>
            </section>

            {/* Activity Calendar */}
            <ActivityCalendar
                activityDays={
                    activityStats.activityDays
                }
            />

            {/* Achievements */}
            <section className="rounded-[2rem] border border-dashed border-indigo-200 bg-indigo-50/50 p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
                            Achievements
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                            Your achievements are coming
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                            Complete lessons, practice consistently,
                            maintain streaks and unlock MediVerse
                            badges.
                        </p>
                    </div>

                    <div className="shrink-0 rounded-2xl bg-white px-5 py-4 text-center shadow-sm">
                        <p className="text-2xl">🏆</p>

                        <p className="mt-1 text-xs font-black uppercase tracking-wider text-slate-500">
                            Coming next
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}