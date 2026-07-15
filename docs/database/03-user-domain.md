# MediVerse User Domain

Version: 1.0

Status: Approved

---

# Purpose

Defines all entities related to students and their learning journey.

This document covers authentication-independent user data.

---

# User

Represents a student using MediVerse.

Responsibilities

- Owns learning progress
- Owns bookmarks
- Owns quiz attempts
- Owns flashcard progress
- Owns reading history

---

# User Profile

Contains

- Full Name
- Username
- Avatar
- Bio
- Institution
- Program
- Semester
- Country
- Preferred Language
- Theme Preference

---

# Bookmark

Allows users to save learning resources.

Supported Resources

- Topic
- Article
- Note
- Flashcard
- Video

---

# Reading Progress

Tracks reading progress.

Stores

- Last Read Position
- Percentage Complete
- Time Spent
- Last Opened

---

# Quiz Attempt

Stores

- Score
- Correct Answers
- Incorrect Answers
- Time Taken
- Attempt Date

Supports multiple attempts.

---

# Flashcard Progress

Stores

- Reviewed
- Mastered
- Ease Factor
- Next Review Date

Future

Spaced Repetition Algorithm

---

# Learning Streak

Stores

- Current Streak
- Longest Streak
- Last Active Date

---

# Achievement

Examples

- First Topic Completed
- 7 Day Streak
- 100 Quiz Questions
- Anatomy Master

---

# Learning Dashboard

Student dashboard shows

- Continue Learning
- Recent Topics
- Bookmarks
- Weekly Progress
- Quiz Performance
- Flashcard Review
- Learning Streak
- Recommended Next Topic

---

# Design Principles

1. Every student owns their own progress.

2. Progress is never shared.

3. Every activity is timestamped.

4. Progress supports analytics.

5. Future AI recommendations use this data.

---

# Future Features

AI Learning Path

Personalized Revision

Adaptive Quiz

Weak Topic Detection

Study Planner

Performance Insights