import {
  db,
  userGamification,
  xpEvents,
} from "@mediverse/database";

import {
  eq,
  sql,
} from "drizzle-orm";

import {
  getLevelFromXp,
} from "./xp-rules";

export async function getGamificationRepository(
  userId: string,
) {
  const [result] = await db
    .select()
    .from(userGamification)
    .where(
      eq(
        userGamification.userId,
        userId,
      ),
    )
    .limit(1);

  return result ?? null;
}

export async function createGamificationRepository(
  userId: string,
) {
  const [result] = await db
    .insert(userGamification)
    .values({
      userId,
    })
    .onConflictDoNothing({
      target: userGamification.userId,
    })
    .returning();

  if (result) {
    return result;
  }

  return getGamificationRepository(userId);
}

export async function awardXpRepository(data: {
  userId: string;
  eventKey: string;
  eventType: string;
  points: number;
  referenceType?: string;
  referenceId?: string;
}) {
  return db.transaction(async (tx) => {
    const [existingEvent] = await tx
      .select({
        id: xpEvents.id,
      })
      .from(xpEvents)
      .where(
        eq(
          xpEvents.eventKey,
          data.eventKey,
        ),
      )
      .limit(1);

    if (existingEvent) {
      const [existingGamification] =
        await tx
          .select()
          .from(userGamification)
          .where(
            eq(
              userGamification.userId,
              data.userId,
            ),
          )
          .limit(1);

      return {
        awarded: false,
        event: null,
        gamification:
          existingGamification ?? {
            id: "",
            userId: data.userId,
            totalXp: 0,
            level: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
      };
    }

    const [event] = await tx
      .insert(xpEvents)
      .values({
        userId: data.userId,
        eventKey: data.eventKey,
        eventType: data.eventType,
        points: data.points,
        referenceType:
          data.referenceType ?? null,
        referenceId:
          data.referenceId ?? null,
      })
      .returning();

    const [existingGamification] =
      await tx
        .select()
        .from(userGamification)
        .where(
          eq(
            userGamification.userId,
            data.userId,
          ),
        )
        .limit(1);

    if (!existingGamification) {
      const initialXp = data.points;

      const level = getLevelFromXp(
        initialXp,
      );

      const [created] = await tx
        .insert(userGamification)
        .values({
          userId: data.userId,
          totalXp: initialXp,
          level: level.level,
        })
        .returning();

      return {
        awarded: true,
        event,
        gamification: created,
      };
    }

    const newXp =
      existingGamification.totalXp +
      data.points;

    const level = getLevelFromXp(newXp);

    const [updated] = await tx
      .update(userGamification)
      .set({
        totalXp: sql`${userGamification.totalXp} + ${data.points}`,
        level: level.level,
        updatedAt: new Date(),
      })
      .where(
        eq(
          userGamification.userId,
          data.userId,
        ),
      )
      .returning();

    return {
      awarded: true,
      event,
      gamification: updated,
    };
  });
}