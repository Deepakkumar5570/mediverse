import {
  createTopicRepository,
  getTopicByIdRepository,
  getTopicBySlugRepository,
  getTopicsByUnitRepository,
  getTopicsRepository,
  updateTopicRepository,
} from "../repositories";

import type {
  CreateTopicInput,
  CreateTopicsInput,
} from "../validations";

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "topic"
  );
}

export async function createTopicService(
  data: CreateTopicInput,
) {
  return createTopicRepository(data);
}

export async function createTopicsService(
  data: CreateTopicsInput,
) {
  const existing =
    await getTopicsByUnitRepository(
      data.unitId,
    );

  const usedSlugs = new Set(
    existing.map((item) => item.slug),
  );

  const startNumber =
    existing.length + 1;

  const created = [];

  for (
    let index = 0;
    index < data.topics.length;
    index++
  ) {
    const item = data.topics[index];

    const baseSlug = slugify(item.title);

    let slug = baseSlug;
    let suffix = 2;

    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    usedSlugs.add(slug);

    const topic =
      await createTopicRepository({
        unitId: data.unitId,
        title: item.title,
        slug,
        topicNumber:
          startNumber + index,
        description:
          item.description,
        status: item.status,
      });

    created.push(topic);
  }

  return created;
}

export async function getTopicsService() {
  return getTopicsRepository();
}

export async function getTopicByIdService(
  id: string,
) {
  return getTopicByIdRepository(id);
}

export async function getTopicBySlugService(
  slug: string,
) {
  return getTopicBySlugRepository(slug);
}

export async function getTopicsByUnitService(
  unitId: string,
) {
  return getTopicsByUnitRepository(unitId);
}

export async function updateTopicService(
  id: string,
  data: CreateTopicInput,
) {
  return updateTopicRepository(id, data);
}