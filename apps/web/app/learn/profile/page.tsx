import { currentUser } from "@clerk/nextjs/server";

import { LearnLayout } from "@/src/components/learn";

import {
  getContinueLearningAction,
  getProgressSummaryAction,
} from "@/src/features/progress";

import {
  getProfileAction,
  ProfileDashboard,
} from "@/src/features/profile";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const [profile, summary, continueLearning] = await Promise.all([
    getProfileAction(),
    getProgressSummaryAction(),
    getContinueLearningAction(),
  ]);

  const name =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    "MediVerse Student";

  return (
    <LearnLayout>
      <main className="space-y-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Your learning, practice, activity, and achievements — all in one
            place.
          </p>
        </div>

        <ProfileDashboard
          user={{
            name,
            imageUrl: user.imageUrl,
          }}
          profile={profile}
          summary={summary}
          continueLearning={continueLearning}
        />
      </main>
    </LearnLayout>
  );
}