# Changesets

This repository uses [Changesets](https://github.com/changesets/changesets) for automated versioning and publishing.

## How It Works

### 1. Developer Workflow: Adding Changesets

When you make changes to any package, create a changeset to document what changed:

```bash
pnpm changeset
```

This interactive CLI will ask you:
- **Which packages changed?** - Select the modified packages
- **What type of change?** - Choose the semantic version bump:
  - **Major**: Breaking changes (1.0.0 → 2.0.0)
  - **Minor**: New features, backward compatible (1.0.0 → 1.1.0)
  - **Patch**: Bug fixes, backward compatible (1.0.0 → 1.0.1)
- **Summary**: Brief description of the changes

Commit the changeset file with your code changes:

```bash
git add .changeset
git commit -m "Add feature X"
git push
```

### 2. Automated Release Process

Once your PR with the changeset is merged to `master`, our GitHub Action automatically:

1. **Creates/Updates a "Version Packages" PR** that:
   - Bumps package versions in `package.json` files
   - Generates/updates `CHANGELOG.md` files
   - Removes processed changeset files

2. **Updates the Version PR automatically** when new changesets are merged to master (changelog keeps growing)

3. **Publishes to npm automatically** when the "Version Packages" PR is merged:
   - Builds all packages
   - Publishes to npm
   - Creates git tags

## Example Workflow

```bash
# 1. Make your changes
git checkout -b feature/custom-formats
# ... edit code ...

# 2. Create a changeset
pnpm changeset
# Select: @repo/react-a11y-date-input
# Type: minor
# Summary: "Add custom date format support"

# 3. Commit and push
git add .
git commit -m "Add custom date format support"
git push origin feature/custom-formats

# 4. Create PR and get it reviewed
# After merge, the GitHub Action automatically creates a "Version Packages" PR

# 5. Review and merge the "Version Packages" PR
# Packages are automatically published to npm!
```

## Setup Required

### For Publishing to npm

Before the automated publishing can work, you need to:

1. **Add NPM_TOKEN to GitHub Secrets**:
   - Generate an npm token: `npm login` then create a token at https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Add it to GitHub: Repository Settings → Secrets → New repository secret
   - Name: `NPM_TOKEN`
   - Value: Your npm token

2. **Update package.json files** for packages you want to publish:
   ```json
   {
     "name": "@your-org/react-a11y-date-input",
     "version": "0.0.0",
     "private": false,  // or remove this line
     "repository": {
       "type": "git",
       "url": "https://github.com/your-username/new-date-input"
     },
     "author": "Your Name",
     "license": "MIT"
   }
   ```

## Configuration

See [.changeset/config.json](config.json) for configuration. Key settings:

- **access**: `"public"` - Packages are published as public
- **baseBranch**: `"master"` - Main branch for releases
- **ignore**: Apps and internal packages that shouldn't be published

## Scripts

- `pnpm changeset` - Create a new changeset
- `pnpm changeset:version` - Update versions (automated by GitHub Action)
- `pnpm changeset:publish` - Publish to npm (automated by GitHub Action)

## More Information

- [Changesets Documentation](https://github.com/changesets/changesets)
- [GitHub Action](https://github.com/changesets/action)
- [Semantic Versioning](https://semver.org/)
