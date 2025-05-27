# @crimsonsunset/cursor-config

Shared Cursor rules configuration package. Automatically installs standardized Cursor rules to any project.

## Installation

```bash
npm install -D @crimsonsunset/cursor-config
```

That's it! The `.cursor/rules/` directory will be automatically created in your project root with all rule files.

## What it does

- Creates `.cursor/rules/` directory in your project root via postinstall script
- Merges with existing rules - only installs rules that don't already exist
- Contains comprehensive development guidelines and best practices
- Works with Cursor's latest `.mdc` rule format

## Rules included

### Auto-Applied Rules
- **large.mdc** - Comprehensive development standards (auto-applies to all conversations)

### Manual Rules (use `@rulename`)
- **starter.mdc** - New codebase onboarding protocol (`@starter`)
- **performance.mdc** - Performance optimization guidelines (`@performance`) 
- **security.mdc** - Security best practices (`@security`)
- **testing.mdc** - Test strategy and debugging (`@testing`)
- **backend.mdc** - API design and backend practices (`@backend`)

## Manual installation

If you prefer not to use the postinstall script:

```bash
npm install -D @crimsonsunset/cursor-config --ignore-scripts
```

Then manually copy the rules:
```bash
mkdir -p .cursor/rules
cp node_modules/@crimsonsunset/cursor-config/.cursor/*.mdc .cursor/rules/
```

## Updating

To get the latest rules:
```bash
rm -rf .cursor/rules
npm reinstall @crimsonsunset/cursor-config
```

## Releasing

### Version Management
```bash
# Patch version (bug fixes, rule improvements)
npm version patch

# Minor version (new rules, significant updates)
npm version minor

# Major version (breaking changes)
npm version major
```

### Publishing Process
1. **Test locally first:**
   ```bash
   # Test in another project
   npm pack
   cd ../test-project
   npm install ../cursor-config/crimsonsunset-cursor-config-X.X.X.tgz
   ```

2. **Publish to npm:**
   ```bash
   npm publish
   ```

3. **Verify publication:**
   ```bash
   npm view @crimsonsunset/cursor-config
   ```

### Release Checklist
- [ ] Test installation in clean project
- [ ] Verify all `.mdc` files are included in package
- [ ] Check postinstall script works correctly
- [ ] Update version in package.json
- [ ] Publish to npm
- [ ] Test installation from npm registry

### Troubleshooting Releases
- **403 Forbidden:** Version already exists, bump version first
- **Missing files:** Check `.npmignore` and `package.json` files array
- **Postinstall fails:** Test script locally with `node scripts/install.js`

## License

MIT 