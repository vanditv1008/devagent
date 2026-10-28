# Ask Mode

## Question

what is written in orchestrator.ts in folder ask summarize it

## Answer

# Summary of `modes/ask/orchestrator.ts`

This file implements the **"Ask Mode"** of the AI agent — a feature that lets users ask questions and get answers from the AI, optionally saving the Q&A to a markdown file.

## What it does:

1. **Prompts the user** for their question via an interactive text input.

2. **Sets up the agent** with tools that are restricted (read-only for file operations, no shell access, no modification of existing files, only creation allowed).

3. **Creates specialized tools** for the ask agent:
   - `read_file` – reads a file from the workspace
   - `list_files` – lists files/directories
   - `search_files` – searches files by glob pattern + content filter
   - `analyze_codebase` – summarizes project structure
   - `list_skills` / `read_skill` – manage agent skills

4. **Runs the AI agent** (`ToolLoopAgent`) to generate an answer, displays it in the terminal.

5. **Optionally saves** the Q&A pair (question + answer) to a markdown file (default name: `ask.md`), with validation that the filename is safe (no paths, must end in `.md`).

6. **Approval flow** — runs before saving, using the `ActionTracker`/`ToolExecutor` approval mechanism.

## Purpose:
The core purpose is to let users query the AI about the codebase and persist the conversation as a markdown document.
