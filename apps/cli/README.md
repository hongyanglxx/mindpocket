# MindPocket CLI

MindPocket CLI is a JSON-first command line client for agents, scripts, and developers working with a MindPocket server.

## Requirements

- Node.js 18 or newer

## Install

```bash
npm install -g mindpocket
```

Or with pnpm:

```bash
pnpm add -g mindpocket
```

## Quick Start

```bash
mindpocket --help
mindpocket config set server https://your-domain.com
mindpocket auth login
mindpocket user me
mindpocket bookmarks list
```

## Login Flow

MindPocket CLI uses OAuth Device Authorization.

1. Run `mindpocket auth login`
2. Open the verification URL shown by the CLI
3. Sign in to your MindPocket account
4. Approve the device request
5. Return to the terminal and continue using CLI commands

## Common Commands

```bash
mindpocket auth --help
mindpocket config get
mindpocket user me
mindpocket bookmarks list --limit 10
mindpocket bookmarks create --url https://example.com
mindpocket folders list
```

## Help for Agents

Every command provides structured `--help` output with:

- Summary
- Usage
- Arguments
- Options
- Auth requirements
- Output fields
- Examples
- Errors

Examples:

```bash
mindpocket --help
mindpocket auth --help
mindpocket bookmarks create --help
```

## Upgrade

```bash
npm install -g mindpocket@latest
```

## Uninstall

```bash
npm uninstall -g mindpocket
```
