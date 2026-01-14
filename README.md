# @crimsonsunset/cursor-config

Shared Cursor rules configuration - managed directly from `~/.cursor/` and published as an npm package.

## Two ways to use this:

### 1. Install as npm package (recommended for teams)

```bash
npm install -D @crimsonsunset/cursor-config
```

That's it! The `.cursor/rules/` directory will be automatically created in your project root with all rule files.

### 2. Work directly from source (for personal development)

This repo lives at `~/.cursor/` and can be committed/pushed directly from there. All your Cursor rules are version controlled and can be shared across machines.

## What it does

- Contains comprehensive development guidelines and best practices
- Works with Cursor's latest `.mdc` rule format
- Publishes to npm for easy sharing with teams
- Can be managed directly from your `~/.cursor/` folder

## Rules included

### Auto-Applied Rules
- **always.mdc** - Core development standards (auto-applies to all conversations)
- **large.mdc** - Comprehensive development standards
- **large-organized.mdc** - Organized version of comprehensive standards

### Manual Rules (use `@rulename`)
- **starter.mdc** - New codebase onboarding protocol
- **performance.mdc** - Performance optimization guidelines
- **security.mdc** - Security best practices
- **testing.mdc** - Test strategy and debugging
- **unit-tests.mdc** - Unit testing guidelines
- **backend.mdc** - API design and backend practices
- **critical-engineer.mdc** - Critical engineer persona
- **ha-addon-development.mdc** - Home Assistant addon development
- **meeting_recon.md** - Meeting reconnaissance

### Quality Control Rules (use `@qc-*`)
- **qc-full-audit.mdc** - Complete quality audit
- **qc-arch.mdc** - Architecture review
- **qc-code-quality.mdc** - Code quality checks
- **qc-deps-config.mdc** - Dependencies and configuration
- **qc-docs.mdc** - Documentation review
- **qc-perf.mdc** - Performance analysis
- **qc-security-vulns.mdc** - Security vulnerability scan
- **qc-shipit-killit.mdc** - Ship/kill decision framework
- **qc-standards.mdc** - Standards compliance
- **qc-tech-debt.mdc** - Technical debt assessment
- **qc-testing.mdc** - Testing coverage review

### Analysis Rules (use `@analysis-*`)
- **analysis-futureproof.mdc** - Future-proofing analysis
- **analysis-industry-standards.mdc** - Industry standards check
- **analysis-scoring.mdc** - Code scoring rubric
- **derived-cursor-rules.mdc** - Derived rules from cursor docs

## Working from source

This repo lives at `~/.cursor/` so you can work on rules directly:

```bash
cd ~/.cursor
git status
# Edit rules in ~/.cursor/rules/
git add rules/
git commit -m "Update rules"
git push
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