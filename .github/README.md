# CI/CD & Security Configuration

[![CI/CD Pipeline](https://github.com/YOUR_USERNAME/RiansRespiteWeb/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/YOUR_USERNAME/RiansRespiteWeb/actions/workflows/ci-cd.yml)
[![CodeQL](https://github.com/YOUR_USERNAME/RiansRespiteWeb/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/YOUR_USERNAME/RiansRespiteWeb/actions/workflows/codeql-analysis.yml)
[![SLSA 3](https://slsa.dev/images/gh-badge-level3.svg)](https://slsa.dev)

## Overview

This repository implements comprehensive CI/CD automation with artifact signing and security scanning for policy compliance.

## ✅ What's Configured

### 🔄 CI/CD Pipeline ([ci-cd.yml](workflows/ci-cd.yml))
- Automated builds for Node.js and Python
- Linting and testing on every push/PR
- **Artifact signing** with Sigstore
- **GitHub attestations** for build provenance
- Trivy security scanning
- Dependency vulnerability review

### 🔒 SLSA Provenance ([slsa-provenance.yml](workflows/slsa-provenance.yml))
- SLSA Level 3 supply chain security
- Cryptographically signed build metadata
- Automated provenance verification
- Runs on every release

### 🛡️ Security Scanning ([codeql-analysis.yml](workflows/codeql-analysis.yml))
- CodeQL static analysis (JavaScript/TypeScript + Python)
- Weekly automated security scans
- PR security checks
- Results in Security tab

### 🤖 Dependency Management ([dependabot.yml](dependabot.yml))
- Automated weekly updates for npm, pip, and GitHub Actions
- Automatic PR creation with changelogs
- Vulnerability monitoring

## 🚀 Quick Start

### 1. Enable Repository Settings
```
Settings → Actions → General:
  ✅ Read and write permissions
  ✅ Allow GitHub Actions to create pull requests

Settings → Code security and analysis:
  ✅ Dependency graph
  ✅ Dependabot alerts
  ✅ CodeQL analysis
```

### 2. Create First Release
```bash
git tag -a v0.1.0 -m "Initial release"
git push origin v0.1.0
```

Or via GitHub UI: Releases → Draft new release → Publish

### 3. Monitor Workflows
Go to **Actions** tab to see workflows running

## 📦 Artifact Signing

All release artifacts are automatically:
- ✅ Signed with Sigstore (keyless, OIDC-based)
- ✅ Attested by GitHub
- ✅ Accompanied by SLSA provenance
- ✅ Verifiable by end users

### How to Verify Artifacts

**Download from Releases:**
- `build-artifacts.tar.gz` - Built application
- `build-artifacts.tar.gz.sha256` - Checksum
- `build-artifacts.tar.gz.sig` - Sigstore signature
- `*.intoto.jsonl` - SLSA provenance

**Verify with Cosign:**
```bash
cosign verify-blob \
  --signature build-artifacts.tar.gz.sig \
  --certificate build-artifacts.tar.gz.cert \
  build-artifacts.tar.gz
```

**Verify with SLSA Verifier:**
```bash
slsa-verifier verify-artifact build-artifacts.tar.gz \
  --provenance-path *.intoto.jsonl \
  --source-uri github.com/YOUR_USERNAME/RiansRespiteWeb
```

## 📊 Monitoring

| Dashboard | What to Check |
|-----------|--------------|
| **Actions** | Workflow runs, build status |
| **Security** | Dependabot alerts, CodeQL results |
| **Insights → Dependency graph** | Vulnerability overview |
| **Releases** | Signed artifacts and attestations |

## 📚 Documentation

- **[CI-CD-SETUP.md](../CI-CD-SETUP.md)** - Detailed setup guide and troubleshooting
- **[SECURITY.md](../SECURITY.md)** - Security policy and best practices
- **[QUICK-REFERENCE.md](../QUICK-REFERENCE.md)** - Quick reference for common tasks

## 🎯 Policy Compliance

✅ **CI/CD Process** - GitHub Actions workflows for build automation  
✅ **Artifact Signing** - Sigstore + GitHub attestations + SLSA provenance  
✅ **Security Scanning** - CodeQL, Trivy, dependency reviews  
✅ **Dependency Management** - Automated updates and vulnerability monitoring

## 🔗 Resources

- [Sigstore Documentation](https://www.sigstore.dev/)
- [SLSA Framework](https://slsa.dev/)
- [GitHub Actions Security](https://docs.github.com/en/actions/security-guides)
- [CodeQL Docs](https://codeql.github.com/)

---

**Note**: Workflows use OIDC authentication (no secrets required). First workflow run may need permissions enabled in repository settings.
