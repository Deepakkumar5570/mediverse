import { relations } from "drizzle-orm/relations";
import { subtopics, contents, progress, semesters, subjects, units, programs, topics } from "./schema";

export const contentsRelations = relations(contents, ({one, many}) => ({
	subtopic: one(subtopics, {
		fields: [contents.subtopicId],
		references: [subtopics.id]
	}),
	progresses: many(progress),
}));

export const subtopicsRelations = relations(subtopics, ({one, many}) => ({
	contents: many(contents),
	topic: one(topics, {
		fields: [subtopics.topicId],
		references: [topics.id]
	}),
}));

export const progressRelations = relations(progress, ({one}) => ({
	content: one(contents, {
		fields: [progress.contentId],
		references: [contents.id]
	}),
}));

export const subjectsRelations = relations(subjects, ({one, many}) => ({
	semester: one(semesters, {
		fields: [subjects.semesterId],
		references: [semesters.id]
	}),
	units: many(units),
}));

export const semestersRelations = relations(semesters, ({one, many}) => ({
	subjects: many(subjects),
	program: one(programs, {
		fields: [semesters.programId],
		references: [programs.id]
	}),
}));

export const unitsRelations = relations(units, ({one, many}) => ({
	subject: one(subjects, {
		fields: [units.subjectId],
		references: [subjects.id]
	}),
	topics: many(topics),
}));

export const programsRelations = relations(programs, ({many}) => ({
	semesters: many(semesters),
}));

export const topicsRelations = relations(topics, ({one, many}) => ({
	unit: one(units, {
		fields: [topics.unitId],
		references: [units.id]
	}),
	subtopics: many(subtopics),
}));