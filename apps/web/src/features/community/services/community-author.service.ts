import { clerkClient } from "@clerk/nextjs/server";

export type CommunityAuthor = {
  id: string;
  name: string;
  imageUrl: string | null;
};

function getDisplayName(user: {
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  id: string;
}) {
  const fullName = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (fullName) {
    return fullName;
  }

  if (user.username) {
    return user.username;
  }

  return "MediVerse Member";
}

export async function getCommunityAuthors(
  authorIds: string[],
): Promise<Record<string, CommunityAuthor>> {
  const uniqueAuthorIds = [
    ...new Set(authorIds.filter(Boolean)),
  ];

  if (uniqueAuthorIds.length === 0) {
    return {};
  }

  const client = await clerkClient();

  const { data: users } =
    await client.users.getUserList({
      userId: uniqueAuthorIds.slice(0, 100),
    });

  return Object.fromEntries(
    users.map((user) => [
      user.id,
      {
        id: user.id,
        name: getDisplayName(user),
        imageUrl: user.imageUrl ?? null,
      },
    ]),
  );
}