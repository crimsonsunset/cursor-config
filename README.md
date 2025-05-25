# @crimsonsunset/cursor-config

Shared Cursor rules configuration package. Automatically installs standardized Cursor rules to any project.

## Installation

```bash
npm install -D @crimsonsunset/cursor-config
```

That's it! The `.cursor/rules` file will be automatically created in your project root.

## What it does

- Creates `.cursor/rules` in your project root via postinstall script
- Won't overwrite existing rules files
- Contains comprehensive development guidelines and best practices
- Works with Cursor's latest multi-root workspace feature

## Rules included

- Code quality standards (DRY, readability over performance)
- Communication style (terse, expert-level)
- File management practices
- Environment-aware development (dev/test/prod)
- Clean codebase maintenance
- Error handling and debugging practices

## Manual installation

If you prefer not to use the postinstall script:

```bash
npm install -D @crimsonsunset/cursor-config --ignore-scripts
```

Then manually copy the rules:
```bash
mkdir -p .cursor
cp node_modules/@crimsonsunset/cursor-config/.cursor/rules .cursor/rules
```

## Updating

```bash
rm .cursor/rules
npm reinstall @crimsonsunset/cursor-config
```

## License

MIT 