import {
  createSubtopicRepository,
  getSubtopicByIdRepository,
  getSubtopicBySlugRepository,
  getSubtopicsByTopicRepository,
  getSubtopicsRepository,
  updateSubtopicRepository,
} from "../repositories";

import type {
  CreateSubtopicInput,
  CreateSubtopicsInput,
} from "../validations";

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "subtopic"
  );
}

export async function createSubtopicService(
  data: CreateSubtopicInput,
) {
  return createSubtopicRepository(data);
}

export async function createSubtopicsService(
  data: CreateSubtopicsInput,
) {
  const existing =
    await getSubtopicsByTopicRepository(
      data.topicId,
    );

  const usedSlugs = new Set(
    existing.map((item) => item.slug),
  );

  const startNumber =
    existing.length + 1;

  const created = [];

  for (
    let index = 0;
    index < data.subtopics.length;
    index++
  ) {
    const item = data.subtopics[index];

    const baseSlug = slugify(item.title);

    let slug = baseSlug;
    let suffix = 2;

    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    usedSlugs.add(slug);

    const subtopic =
      await createSubtopicRepository({
        topicId: data.topicId,
        title: item.title,
        slug,
        subtopicNumber:
          startNumber + index,
        description:
          item.description,
        status: item.status,
      });

    created.push(subtopic);
  }

  return created;
}

export async function getSubtopicsService() {
  return getSubtopicsRepository();
}

export async function getSubtopicByIdService(
  id: string,
) {
  return getSubtopicByIdRepository(id);
}

export async function getSubtopicBySlugService(
  slug: string,
) {
  return getSubtopicBySlugRepository(slug);
}

export async function getSubtopicsByTopicService(
  topicId: string,
) {
  return getSubtopicsByTopicRepository(
    topicId,
  );
}

export async function updateSubtopicService(
  id: string,
  data: CreateSubtopicInput,
) {
  return updateSubtopicRepository(id, data);
}