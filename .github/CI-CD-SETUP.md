# CI/CD and Security Configuration

## Overview

This repository now has a comprehensive CI/CD pipeline with artifact signing and security scanning to ensure policy compliance and supply chain security.

## What Was Configured

### 1. CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

**Features:**
- ✅ Automated builds on push and pull requests
- ✅ Node.js and Python testing
- ✅ Linting checks
- ✅ Build artifact generation
- ✅ Build provenance tracking
- ✅ **Artifact Signing** with Sigstore
- ✅ **GitHub Attestations** for build provenance
- ✅ Security scanning with Trivy
- ✅ Dependency review for PRs

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Release creation

### 2. SLSA Provenance (`.github/workflows/slsa-provenance.yml`)

**Features:**
- ✅ SLSA Level 3 build provenance generation
- ✅ Cryptographic signing of build metadata
- ✅ Automated verification of provenance
- ✅ Supply chain security compliance

**Triggers:**
- Release creation
- Manual workflow dispatch

### 3. CodeQL Security Analysis (`.github/workflows/codeql-analysis.yml`)

**Features:**
- ✅ Static code analysis for JavaScript/TypeScript
- ✅ Static code analysis for Python
- ✅ Security vulnerability detection
- ✅ Code quality checks
- ✅ Weekly scheduled scans

**Triggers:**
- Push to `main` or `develop`
- Pull requests
- Weekly schedule (Mondays at 6:00 UTC)

### 4. Dependabot (`.github/dependabot.yml`)

**Features:**
- ✅ Automated dependency updates for npm packages
- ✅ Automated Python package updates
- ✅ GitHub Actions workflow updates
- ✅ Weekly update schedule
- ✅ Automatic PR creation with changelogs

### 5. Security Policy (`SECURITY.md`)

**Features:**
- ✅ Vulnerability reporting guidelines
- ✅ Artifact verification instructions
- ✅ Security best practices
- ✅ Compliance documentation

## Artifact Signing Explained

### What is Artifact Signing?

Artifact signing ensures that build artifacts (compiled code, binaries, packages) are:
1. **Authentic**: Created by your trusted build system
2. **Unmodified**: Not tampered with after creation
3. **Traceable**: Linked to specific code commits

### Technologies Used

1. **Sigstore**: Keyless signing using OIDC (no key management needed)
2. **GitHub Attestations**: Native GitHub artifact provenance
3. **SLSA Provenance**: Industry-standard build metadata

### How It Works

```
Code Push → GitHub Actions → Build → Sign Artifacts → Attestation
                                ↓
                         Stored in GitHub
                                ↓
                    Users can verify authenticity
```

## Setting Up for Your Repository

### Required Secrets (None!)

The workflows use **OIDC (OpenID Connect)** for authentication, which means:
- ❌ No API keys to manage
- ❌ No secrets to configure
- ✅ Automatic secure authentication via GitHub

### Repository Settings to Enable

1. **Go to Settings → Actions → General**
   - Enable "Read and write permissions" for workflows
   - Enable "Allow GitHub Actions to create and approve pull requests"

2. **Go to Settings → Code security and analysis**
   - Enable "Dependency graph"
   - Enable "Dependabot alerts"
   - Enable "Dependabot security updates"
   - Enable "CodeQL analysis"

3. **Go to Settings → Branches**
   - Add branch protection rule for `main`:
     - Require pull request reviews
     - Require status checks to pass
     - Include administrators

### First Time Setup

1. **Push these files to your repository:**
   ```bash
   git add .github/
   git add SECURITY.md
   git commit -m "feat: add CI/CD pipeline with artifact signing"
   git push origin main
   ```

2. **Create your first release:**
   ```bash
   git tag -a v0.1.0 -m "Initial release"
   git push origin v0.1.0
   ```

3. **Create a release on GitHub:**
   - Go to Releases → Draft a new release
   - Select tag `v0.1.0`
   - Publish release

4. **Watch the workflows run:**
   - Go to Actions tab
   - See CI/CD, SLSA Provenance, and CodeQL workflows execute

## Verifying Signed Artifacts

When a release is created, artifacts will be signed. Users can verify them:

### Download Artifacts from Release

The release will contain:
- `build-artifacts.tar.gz` - Your built application
- `build-artifacts.tar.gz.sha256` - Checksum
- `build-artifacts.tar.gz.sig` - Sigstore signature
- `*.intoto.jsonl` - SLSA provenance

### Verification Steps

```bash
# 1. Verify checksum
sha256sum -c build-artifacts.tar.gz.sha256

# 2. Verify with cosign (Sigstore)
cosign verify-blob \
  --signature build-artifacts.tar.gz.sig \
  --certificate build-artifacts.tar.gz.cert \
  build-artifacts.tar.gz

# 3. Verify SLSA provenance
slsa-verifier verify-artifact build-artifacts.tar.gz \
  --provenance-path *.intoto.jsonl \
  --source-uri github.com/YOUR_USERNAME/RiansRespiteWeb
```

## Policy Compliance Checklist

✅ **CI/CD Process**
- Automated build pipeline configured
- Multiple trigger points (push, PR, release)
- Build validation and testing

✅ **Artifact Signing**
- Sigstore keyless signing implemented
- GitHub native attestations enabled
- SLSA Level 3 provenance generation
- Verification instructions provided

✅ **Security Scanning**
- CodeQL static analysis for both languages
- Trivy vulnerability scanning
- Dependency review on pull requests
- Regular scheduled security scans

✅ **Dependency Management**
- Dependabot automated updates
- Multi-ecosystem support (npm, pip, GitHub Actions)
- Version control and audit trail

✅ **Documentation**
- Security policy documented
- Artifact verification guidelines
- Compliance measures explained

## Monitoring and Maintenance

### Regular Tasks

1. **Review Dependabot PRs**: Check and merge dependency updates weekly
2. **Monitor Security Alerts**: Address vulnerabilities in the Security tab
3. **Review CodeQL Results**: Check code quality reports monthly
4. **Update Workflows**: Keep GitHub Actions up to date

### Dashboards to Monitor

- **Actions Tab**: Build success/failure rates
- **Security Tab**: 
  - Dependabot alerts
  - CodeQL analysis results
  - Secret scanning (if enabled)
- **Insights → Dependency graph**: Dependency tree and vulnerabilities

## Troubleshooting

### Workflow Fails on First Run

**Reason**: Permissions not configured

**Fix**: Go to Settings → Actions → General → Workflow permissions → Select "Read and write permissions"

### Sigstore Signing Fails

**Reason**: Missing `id-token: write` permission

**Fix**: Already configured in the workflow file. Ensure workflows have OIDC enabled (automatic on github.com)

### SLSA Provenance Job Fails

**Reason**: Reusable workflow version mismatch

**Fix**: Update `slsa-github-generator` version in `.github/workflows/slsa-provenance.yml`

## Resources

- [Sigstore Documentation](https://docs.sigstore.dev/)
- [SLSA Framework](https://slsa.dev/)
- [GitHub Actions Security](https://docs.github.com/en/actions/security-guides)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [CodeQL](https://codeql.github.com/)

## Support

For issues or questions about this CI/CD setup:
1. Check the Actions tab for workflow logs
2. Review this documentation
3. Consult GitHub's official documentation
4. Open an issue in the repository
