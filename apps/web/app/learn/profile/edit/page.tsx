import Link from "next/link";

import { LearnLayout } from "@/src/components/learn";
import {
  getProfileAction,
  ProfileEditForm,
} from "@/src/features/profile";

export default async function EditProfilePage() {
  const profile = await getProfileAction();

  return (
    <LearnLayout>
      <main className="space-y-8">
        <div>
          <Link
            href="/learn/profile"
            className="text-sm font-bold text-slate-500 hover:text-indigo-600"
          >
            ← Back to Profile
          </Link>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950">
            Edit Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Keep your MediVerse profile up to date.
          </p>
        </div>

        <ProfileEditForm
          initialUsername={profile?.username}
          initialBio={profile?.bio}
        />
      </main>
    </LearnLayout>
  );
}