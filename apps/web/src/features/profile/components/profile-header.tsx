import Image from "next/image";
import Link from "next/link";

type ProfileHeaderProps = {
  name: string;
  username?: string | null;
  imageUrl?: string | null;
  bio?: string | null;
  programName?: string | null;
  semesterName?: string | null;
};

export function ProfileHeader({
  name,
  username,
  imageUrl,
  bio,
  programName,
  semesterName,
}: ProfileHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-100/60 blur-3xl" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-black text-white">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              {name}
            </h1>

            {username && (
              <p className="mt-1 text-sm font-medium text-indigo-600">
                @{username}
              </p>
            )}

            {(programName || semesterName) && (
              <p className="mt-2 text-sm text-slate-500">
                {[programName, semesterName].filter(Boolean).join(" • ")}
              </p>
            )}

            {bio && (
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                {bio}
              </p>
            )}
          </div>
        </div>

        <Link
          href="/learn/profile/edit"
          className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-600"
        >
          Edit Profile
        </Link>
      </div>

      <div className="relative mt-7 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6 sm:max-w-md">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-2xl font-black text-slate-950">0</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Followers
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-2xl font-black text-slate-950">0</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Following
          </p>
        </div>
      </div>
    </section>
  );
}