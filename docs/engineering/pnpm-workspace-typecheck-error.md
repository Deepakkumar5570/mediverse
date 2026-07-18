# PNPM Workspace Typecheck Error Troubleshooting

## Issue Summary

While setting up the MediVerse monorepo, the `typecheck` command repeatedly failed before TypeScript even started.

Instead of executing:

```bash
tsc --noEmit
```

pnpm printed errors such as:

```
ERR_PNPM_IGNORED_BUILDS
Command failed with exit code 1: pnpm install
```

or

```
ERR_PNPM_WORKSPACE_PKG_NOT_FOUND
```

or

```
Missing script: typecheck
```

This made it appear that TypeScript or the workspace packages were broken.

---

# Environment

- Node.js 24
- PNPM 11
- Next.js 16
- Windows 11
- Monorepo structure

```
apps/
packages/
pnpm-workspace.yaml
```

---

# Initial Assumptions

We initially suspected:

- TypeScript configuration
- tsconfig.json
- Workspace packages
- Path aliases
- Package exports
- Missing index.ts files
- Clerk configuration
- Drizzle configuration

None of these were the root cause.

---

# Root Cause

The actual problem was **not TypeScript**.

The issue occurred because the command was executed from the wrong workspace level.

Example:

```
F:\mediverse

pnpm run typecheck
```

The root package did **not** contain a `typecheck` script.

Its package.json contained:

```json
"scripts": {}
```

Therefore pnpm returned:

```
Missing script: typecheck
```

---

Later we attempted

```
pnpm typecheck
```

which caused pnpm to enter its workspace dependency resolution.

This produced misleading errors like:

```
ERR_PNPM_WORKSPACE_PKG_NOT_FOUND
```

even though the packages actually existed.

---

# Workspace Verification

The following workspace packages were verified:

```
packages/database
packages/types
packages/utils
packages/validation
```

All package names matched their package.json.

Example:

```
@mediverse/types
@mediverse/validation
```

The workspace was correctly detected.

Verified using

```
pnpm list -r --depth -1
```

Output confirmed all packages.

---

# Actual Fix

Instead of executing from the repository root,

Run the command inside the web application.

```
F:\mediverse\apps\web
```

Then execute

```bash
pnpm run typecheck
```

Expected output

```
> tsc --noEmit
```

No errors.

---

# Build Verification

After fixing the command location we verified the production build.

```
cd apps/web

pnpm build
```

Result

```
Compiled successfully

Generating static pages

Finalizing page optimization
```

Build completed successfully.

---

# Why This Happened

The repository root is only the workspace container.

The actual Next.js application lives inside

```
apps/web
```

Only this package contains

```json
"typecheck": "tsc --noEmit"
```

Running commands from the wrong package causes pnpm to search for scripts that do not exist.

---

# Lessons Learned

Always verify where the script is defined before running it.

Useful command:

```
type package.json
```

Check whether the desired script exists.

---

# Monorepo Rule

Repository Root

```
F:\mediverse
```

Used for

- pnpm install
- git
- workspace management

---

Web Application

```
F:\mediverse\apps\web
```

Used for

- pnpm dev
- pnpm build
- pnpm run typecheck
- pnpm lint

---

Database Package

```
F:\mediverse\packages\database
```

Used for

- database code
- drizzle schema
- exports

---

Validation Package

```
F:\mediverse\packages\validation
```

Used for

- zod schemas

---

Types Package

```
F:\mediverse\packages\types
```

Used for

- shared interfaces
- shared types

---

# Commands That Verified the Fix

```
pnpm list -r --depth -1
```

```
pnpm run typecheck
```

Output

```
> tsc --noEmit
```

```
pnpm build
```

Output

```
Compiled successfully
```

---

# Status

Resolved ✅

Date

15 July 2026

Project

MediVerse

Sprint

Sprint 1 - Day 1

Severity

Medium

Time Spent

Several hours of debugging

Final Result

No TypeScript errors.

Production build successful.

Workspace functioning correctly.