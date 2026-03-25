# pi-co-authored-by

A [Pi](https://github.com/badlogic/pi) extension that automatically appends git trailers to commit messages when the agent runs `git commit`. Uses a fixed AI co-author identity and records both pi version + model in metadata.

## Features

**Co-authored-by trailer** — Uses a standardized AI identity for attribution:
```
Co-authored-by: AI <noreply@pi.dev>
```

**Generated-by trailer** — Records pi version and the actual provider/model used:
```
Generated-by: pi 0.52.12 (openai-codex/gpt-5.3-codex)
```

**Example commit:**
```
fix: resolve null pointer

Co-authored-by: AI <noreply@pi.dev>
Generated-by: pi 0.52.12 (openai-codex/gpt-5.3-codex)
```

## Requirements

- [Pi](https://github.com/badlogic/pi) coding agent

## Install

```bash
pi install npm:pi-co-authored-by
```

Or try it without installing:

```bash
pi -e npm:pi-co-authored-by
```

You can also install from git:

```bash
pi install git:github.com/bruno-garcia/pi-co-authored-by
```

## How it works

The extension hooks into Pi's `tool_call` event. When it detects a `git commit -m` command, it appends two extra `-m` flags to create [git trailers](https://git-scm.com/docs/git-interpret-trailers) with a standardized AI co-author plus pi version/model metadata.

| What | Value |
|------|-------|
| `Co-authored-by` | `AI <noreply@pi.dev>` |
| `Generated-by` | Pi version + provider/model (e.g., `pi 0.52.12 (openai-codex/gpt-5.3-codex)`) |

## Development

```bash
npm install
npm test
```

## License

MIT
