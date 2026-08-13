import { pgTable, unique, uuid, varchar, text, timestamp, integer, foreignKey, uniqueIndex, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const programs = pgTable("programs", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 150 }).notNull(),
	slug: varchar({ length: 180 }).notNull(),
	code: varchar({ length: 30 }).notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	duration: integer().notNull(),
	status: varchar({ length: 20 }).notNull(),
}, (table) => [
	unique("programs_slug_unique").on(table.slug),
	unique("programs_code_unique").on(table.code),
]);

export const contents = pgTable("contents", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	subtopicId: uuid("subtopic_id").notNull(),
	title: varchar({ length: 250 }).notNull(),
	slug: varchar({ length: 300 }).notNull(),
	summary: text(),
	content: text().notNull(),
	readingTime: integer("reading_time").default(1).notNull(),
	seoTitle: varchar("seo_title", { length: 250 }),
	seoDescription: text("seo_description"),
	status: varchar({ length: 20 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.subtopicId],
			foreignColumns: [subtopics.id],
			name: "contents_subtopic_id_subtopics_id_fk"
		}).onDelete("cascade"),
	unique("contents_slug_unique").on(table.slug),
]);

export const progress = pgTable("progress", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	contentId: uuid("content_id").notNull(),
	completed: boolean().default(false).notNull(),
	completedAt: timestamp("completed_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	uniqueIndex("progress_user_content_unique").using("btree", table.userId.asc().nullsLast().op("text_ops"), table.contentId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.contentId],
			foreignColumns: [contents.id],
			name: "progress_content_id_contents_id_fk"
		}).onDelete("cascade"),
]);

export const subjects = pgTable("subjects", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 150 }).notNull(),
	slug: varchar({ length: 180 }).notNull(),
	code: varchar({ length: 30 }).notNull(),
	description: text(),
	semester: integer().notNull(),
	status: varchar({ length: 20 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	semesterId: uuid("semester_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.semesterId],
			foreignColumns: [semesters.id],
			name: "subjects_semester_id_semesters_id_fk"
		}).onDelete("restrict"),
	unique("subjects_slug_unique").on(table.slug),
	unique("subjects_code_unique").on(table.code),
]);

export const units = pgTable("units", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	subjectId: uuid("subject_id").notNull(),
	title: varchar({ length: 200 }).notNull(),
	slug: varchar({ length: 220 }).notNull(),
	unitNumber: integer("unit_number").notNull(),
	description: text(),
	status: varchar({ length: 20 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.subjectId],
			foreignColumns: [subjects.id],
			name: "units_subject_id_subjects_id_fk"
		}).onDelete("restrict"),
	unique("units_slug_unique").on(table.slug),
]);

export const semesters = pgTable("semesters", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	programId: uuid("program_id").notNull(),
	name: varchar({ length: 100 }).notNull(),
	number: integer().notNull(),
	status: varchar({ length: 20 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.programId],
			foreignColumns: [programs.id],
			name: "semesters_program_id_programs_id_fk"
		}).onDelete("restrict"),
]);

export const topics = pgTable("topics", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	unitId: uuid("unit_id").notNull(),
	title: text().notNull(),
	slug: text().notNull(),
	topicNumber: integer("topic_number").notNull(),
	description: text(),
	status: text().default('active').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.unitId],
			foreignColumns: [units.id],
			name: "topics_unit_id_units_id_fk"
		}).onDelete("cascade"),
	unique("topics_slug_unique").on(table.slug),
]);

export const subtopics = pgTable("subtopics", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	topicId: uuid("topic_id").notNull(),
	title: text().notNull(),
	slug: text().notNull(),
	subtopicNumber: integer("subtopic_number").notNull(),
	description: text(),
	status: text().default('active').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.topicId],
			foreignColumns: [topics.id],
			name: "subtopics_topic_id_topics_id_fk"
		}).onDelete("cascade"),
	unique("subtopics_slug_unique").on(table.slug),
]);
