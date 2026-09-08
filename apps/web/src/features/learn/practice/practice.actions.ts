"use server";

import {
  and,
  asc,
  count,
  eq,
  ilike,
  sql,
} from "drizzle-orm";

import {
  db,
  mcqs,
  programs,
  semesters,
  subjects,
  units,
  topics,
  subtopics,
} from "@mediverse/database";

type PracticeMCQ = {
  id: string;
  subtopicId: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  difficulty: string;
  questionNumber: number;
};

export async function getPracticeProgramsAction() {
  return db
    .select({
      id: programs.id,
      name: programs.name,
      code: programs.code,
    })
    .from(programs)
    .where(eq(programs.status, "active"))
    .orderBy(asc(programs.name));
}

export async function getPracticeSemestersAction(
  programId: string,
) {
  return db
    .select({
      id: semesters.id,
      name: semesters.name,
      number: semesters.number,
    })
    .from(semesters)
    .where(
      and(
        eq(semesters.programId, programId),
        eq(semesters.status, "active"),
      ),
    )
    .orderBy(asc(semesters.number));
}

export async function searchPracticeTopicsAction(
  programId: string,
  query: string,
) {
  const normalizedQuery = query.trim();

  if (normalizedQuery.length < 2) {
    return {
      topics: [],
      subtopics: [],
    };
  }

  const searchPattern = `%${normalizedQuery}%`;

  const topicResults = await db
    .select({
      id: topics.id,
      title: topics.title,
      topicNumber: topics.topicNumber,
      unitTitle: units.title,
      subjectName: subjects.name,
      semesterName: semesters.name,
      programName: programs.name,
      mcqCount: count(mcqs.id),
    })
    .from(topics)
    .innerJoin(units, eq(topics.unitId, units.id))
    .innerJoin(subjects, eq(units.subjectId, subjects.id))
    .innerJoin(
      semesters,
      eq(subjects.semesterId, semesters.id),
    )
    .innerJoin(
      programs,
      eq(semesters.programId, programs.id),
    )
    .leftJoin(
      subtopics,
      eq(subtopics.topicId, topics.id),
    )
    .leftJoin(
      mcqs,
      and(
        eq(mcqs.subtopicId, subtopics.id),
        eq(mcqs.status, "active"),
      ),
    )
    .where(
      and(
        eq(programs.id, programId),
        eq(programs.status, "active"),
        eq(semesters.status, "active"),
        eq(subjects.status, "active"),
        eq(units.status, "active"),
        eq(topics.status, "active"),
        ilike(topics.title, searchPattern),
      ),
    )
    .groupBy(
      topics.id,
      topics.title,
      topics.topicNumber,
      units.title,
      subjects.name,
      semesters.name,
      programs.name,
    )
    .orderBy(asc(topics.topicNumber))
    .limit(20);

  const subtopicResults = await db
    .select({
      id: subtopics.id,
      title: subtopics.title,
      subtopicNumber: subtopics.subtopicNumber,
      topicTitle: topics.title,
      unitTitle: units.title,
      subjectName: subjects.name,
      semesterName: semesters.name,
      programName: programs.name,
      mcqCount: count(mcqs.id),
    })
    .from(subtopics)
    .innerJoin(
      topics,
      eq(subtopics.topicId, topics.id),
    )
    .innerJoin(units, eq(topics.unitId, units.id))
    .innerJoin(subjects, eq(units.subjectId, subjects.id))
    .innerJoin(
      semesters,
      eq(subjects.semesterId, semesters.id),
    )
    .innerJoin(
      programs,
      eq(semesters.programId, programs.id),
    )
    .leftJoin(
      mcqs,
      and(
        eq(mcqs.subtopicId, subtopics.id),
        eq(mcqs.status, "active"),
      ),
    )
    .where(
      and(
        eq(programs.id, programId),
        eq(programs.status, "active"),
        eq(semesters.status, "active"),
        eq(subjects.status, "active"),
        eq(units.status, "active"),
        eq(topics.status, "active"),
        eq(subtopics.status, "active"),
        ilike(subtopics.title, searchPattern),
      ),
    )
    .groupBy(
      subtopics.id,
      subtopics.title,
      subtopics.subtopicNumber,
      topics.title,
      units.title,
      subjects.name,
      semesters.name,
      programs.name,
    )
    .orderBy(asc(subtopics.subtopicNumber))
    .limit(20);

  return {
    topics: topicResults.map((item) => ({
      ...item,
      mcqCount: Number(item.mcqCount),
    })),
    subtopics: subtopicResults.map((item) => ({
      ...item,
      mcqCount: Number(item.mcqCount),
    })),
  };
}

async function getMcqSelectionByWhere(
  whereCondition: ReturnType<typeof and>,
  limit: number,
) {
  return db
    .select({
      id: mcqs.id,
      subtopicId: mcqs.subtopicId,
      question: mcqs.question,
      optionA: mcqs.optionA,
      optionB: mcqs.optionB,
      optionC: mcqs.optionC,
      optionD: mcqs.optionD,
      difficulty: mcqs.difficulty,
      questionNumber: mcqs.questionNumber,
    })
    .from(mcqs)
    .innerJoin(
      subtopics,
      eq(mcqs.subtopicId, subtopics.id),
    )
    .innerJoin(
      topics,
      eq(subtopics.topicId, topics.id),
    )
    .innerJoin(
      units,
      eq(topics.unitId, units.id),
    )
    .innerJoin(
      subjects,
      eq(units.subjectId, subjects.id),
    )
    .innerJoin(
      semesters,
      eq(subjects.semesterId, semesters.id),
    )
    .innerJoin(
      programs,
      eq(semesters.programId, programs.id),
    )
    .where(
      and(
        whereCondition,
        eq(mcqs.status, "active"),
        eq(subtopics.status, "active"),
        eq(topics.status, "active"),
        eq(units.status, "active"),
        eq(subjects.status, "active"),
        eq(semesters.status, "active"),
        eq(programs.status, "active"),
      ),
    )
    .orderBy(sql`random()`)
    .limit(limit);
}

export async function getQuickPracticeMcqsAction(
  type: "topic" | "subtopic",
  id: string,
) {
  const mcqsResult =
    type === "topic"
      ? await getMcqSelectionByWhere(
          eq(topics.id, id),
          10,
        )
      : await getMcqSelectionByWhere(
          eq(subtopics.id, id),
          10,
        );

  return mcqsResult satisfies PracticeMCQ[];
}

export async function getRandomPracticeMcqsAction(
  semesterId: string,
  questionCount: number,
) {
  const safeQuestionCount = Math.min(
    Math.max(questionCount, 1),
    30,
  );

  const result = await getMcqSelectionByWhere(
    eq(semesters.id, semesterId),
    safeQuestionCount,
  );

  return result satisfies PracticeMCQ[];
}

export async function getTopicPracticeMcqsAction(
  topicId: string,
) {
  const result = await getMcqSelectionByWhere(
    eq(topics.id, topicId),
    50,
  );

  return result satisfies PracticeMCQ[];
}