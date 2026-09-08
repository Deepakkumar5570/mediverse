"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { updateProfileAction } from "../actions/update-profile";

type Props = {
  initialUsername?: string | null;
  initialBio?: string | null;
};

export function ProfileEditForm({
  initialUsername,
  initialBio,
}: Props) {
  const router = useRouter();

  const [username, setUsername] = useState(initialUsername ?? "");
  const [bio, setBio] = useState(initialBio ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      await updateProfileAction({
        username: username.trim() || null,
        bio: bio.trim() || null,
      });

      router.push("/learn/profile");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Unable to update your profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <label className="text-sm font-bold text-slate-700">
          Username
        </label>

        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="your_username"
          maxLength={50}
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div className="mt-6">
        <label className="text-sm font-bold text-slate-700">
          Bio
        </label>

        <textarea
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          placeholder="Tell other MediVerse students a little about yourself..."
          maxLength={500}
          rows={5}
          className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {error && (
        <p className="mt-4 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}