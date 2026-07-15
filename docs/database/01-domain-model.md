# MediVerse Domain Model

Version: 1.0

Status: Approved

Owner: Engineering Team

---

# Purpose

This document defines the business entities of MediVerse.

It is NOT a database schema.

It is NOT SQL.

It describes how the business is organized.

All future database tables, APIs, UI screens and AI features will be built from this document.

---

# Academic Hierarchy

Program
    ↓
Semester
    ↓
Subject
    ↓
Unit
    ↓
Topic

The Topic is the central learning object inside MediVerse.

Everything else is attached to Topic.

---

# Program

Examples

- B.Pharm
- D.Pharm
- MBBS
- B.Sc Nursing
- ANM
- GNM

Version 1

Only B.Pharm is supported.

Responsibilities

- Represents a complete academic program
- Owns semesters
- Defines total duration
- Defines curriculum structure

---

# Semester

Belongs to one Program.

Example

Semester 1

Semester 2

Semester 3

Responsibilities

- Groups subjects
- Maintains semester ordering

---

# Subject

Belongs to one Semester.

Examples

- Human Anatomy
- Pharmaceutics
- Pharmaceutical Chemistry
- Biochemistry

Responsibilities

- Contains Units
- Represents an academic subject

---

# Unit

Belongs to one Subject.

Example

Unit 1

Introduction

Cell

Blood

Responsibilities

- Groups related Topics
- Defines learning sequence

---

# Topic

Belongs to one Unit.

Topic is the most important entity inside MediVerse.

Everything connects to Topic.

Examples

- Cell Membrane
- DNA
- Mitochondria
- Golgi Body

Topic owns

- Notes
- Articles
- Quiz
- Flashcards
- Previous Year Questions
- Videos
- References
- Mnemonics
- Clinical Pearls
- Case Studies

---

# Learning Resources

Every Topic may contain:

Notes

↓

Article

↓

Quiz

↓

Flashcards

↓

PYQs

↓

Videos

↓

Mnemonics

↓

Clinical Pearls

↓

References

---

# User Learning Flow

Student

↓

Program

↓

Semester

↓

Subject

↓

Unit

↓

Topic

↓

Read Notes

↓

Read Article

↓

Practice Quiz

↓

Revise Flashcards

↓

Complete Topic

---

# URL Structure

/bpharm

↓

/semester-1

↓

/human-anatomy

↓

/unit-2

↓

/cell-membrane

---

# Breadcrumb

Home

>

B.Pharm

>

Semester 1

>

Human Anatomy

>

Unit 2

>

Cell Membrane

---

# Design Principles

1. Topic is the center of the learning experience.

2. Every learning resource belongs to a Topic.

3. Every Topic should be independently searchable.

4. URLs must be SEO friendly.

5. Academic hierarchy must remain stable.

6. Future AI features should integrate without changing the hierarchy.

---

# Future Modules

The following modules will connect to Topic in future versions.

- AI Tutor
- Community Discussion
- Live Classes
- Doubt Solving
- Certificates
- Premium Content
- Learning Analytics

---

# Version History

Version 1.0

Approved for Sprint 1