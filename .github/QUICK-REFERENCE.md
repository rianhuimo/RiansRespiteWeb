# Quick Reference: CI/CD and Artifact Signing

## 🚀 Quick Start

### 1. Enable Repository Settings

```bash
# Navigate to your GitHub repository settings

Settings → Actions → General:
  ✅ Read and write permissions
  ✅ Allow GitHub Actions to create pull requests

Settings → Code security and analysis:
  ✅ Dependency graph
  ✅ Dependabot alerts
  ✅ Dependabot security updates
  ✅ CodeQL analysis
```

### 2. Push the Configuration

```bash
git add .github/ SECURITY.md CI-CD-SETUP.md README.md
git commit -m "feat: add CI/CD pipeline with artifact signing"
git push origin main
```

### 3. Create Your First Release

```bash
# Tag a release
git tag -a v0.1.0 -m "Initial release with CI/CD"
git push origin v0.1.0

# Or create via GitHub UI:
# Releases → Draft a new release → Choose tag v0.1.0 → Publish
```

---

## 📋 What Was Implemented

### ✅ CI/CD Pipeline (`ci-cd.yml`)
- **Build & Test**: Automated builds for Node.js and Python
- **Artifact Signing**: Sigstore keyless signing of release artifacts
- **GitHub Attestations**: Native build provenance
- **Security Scanning**: Trivy filesystem vulnerability scanner
- **Dependency Review**: Checks PRs for vulnerable dependencies

### ✅ SLSA Provenance (`slsa-provenance.yml`)
- **SLSA Level 3**: Industry-standard supply chain security
- **Build Metadata**: Cryptographically signed build information
- **Verification**: Automated provenance verification

### ✅ CodeQL Analysis (`codeql-analysis.yml`)
- **JavaScript/TypeScript**: Static analysis for frontend code
- **Python**: Static analysis for backend code
- **Weekly Scans**: Scheduled security reviews
- **PR Checks**: Automatic analysis on pull requests

### ✅ Dependabot (`dependabot.yml`)
- **npm Updates**: Weekly Node.js dependency updates
- **pip Updates**: Python dependency updates (2 locations)
- **GitHub Actions**: Workflow version updates
- **Auto PRs**: Automatic pull requests with changelogs

---

## 🔒 Artifact Signing Flow

```
Developer → Git Push → GitHub Actions
                              ↓
                        Build Application
                              ↓
                    Generate Build Hash
                              ↓
                ┌─────────────┴─────────────┐
                ↓                           ↓
        Sign with Sigstore          Generate SLSA
        (keyless signing)           Provenance
                ↓                           ↓
        Create attestation          Cryptographic
        with GitHub                 proof of build
                ↓                           ↓
                └─────────────┬─────────────┘
                              ↓
                    Upload Signed Artifacts
                              ↓
                    Users Can Verify ✓
```

---

## 🔍 How to Verify Artifacts

### Option 1: Verify Checksum (Basic)
```bash
sha256sum -c build-artifacts.tar.gz.sha256
```

### Option 2: Verify Sigstore Signature (Recommended)
```bash
# Install cosign
brew install cosign  # macOS
# or: https://github.com/sigstore/cosign/releases

# Verify
cosign verify-blob \
  --signature build-artifacts.tar.gz.sig \
  --certificate build-artifacts.tar.gz.cert \
  build-artifacts.tar.gz
```

### Option 3: Verify SLSA Provenance (Most Secure)
```bash
# Install slsa-verifier
curl -Lo slsa-verifier \
  https://github.com/slsa-framework/slsa-verifier/releases/download/v2.4.1/slsa-verifier-linux-amd64
chmod +x slsa-verifier

# Verify
./slsa-verifier verify-artifact build-artifacts.tar.gz \
  --provenance-path *.intoto.jsonl \
  --source-uri github.com/YOUR_USERNAME/RiansRespiteWeb \
  --source-tag v0.1.0
```

---

## 📊 Monitoring

### GitHub Actions Tab
- **Workflow Runs**: See all CI/CD executions
- **Build Status**: Success/failure rates
- **Artifact Downloads**: Access signed artifacts

### Security Tab
- **Dependabot Alerts**: Vulnerable dependencies
- **CodeQL Results**: Code security issues
- **Secret Scanning**: Exposed secrets (if enabled)

### Insights → Dependency Graph
- **Dependencies**: Visual dependency tree
- **Vulnerabilities**: Known issues in dependencies

---

## 🛠️ Customization

### Update Dependabot Schedule
Edit `.github/dependabot.yml`:
```yaml
schedule:
  interval: "daily"  # or "weekly", "monthly"
  day: "monday"      # for weekly
```

### Add More Security Scans
Edit `.github/workflows/ci-cd.yml`:
```yaml
- name: Run npm audit
  run: npm audit --audit-level=high
  
- name: OWASP Dependency Check
  uses: dependency-check/Dependency-Check_Action@main
```

### Customize CodeQL Queries
Edit `.github/workflows/codeql-analysis.yml`:
```yaml
queries: +security-extended,security-and-quality
# Options: security-extended, security-and-quality, or custom
```

---

## ⚠️ Troubleshooting

### "Permission denied" error
**Fix**: Settings → Actions → General → "Read and write permissions"

### Sigstore signing fails
**Fix**: Ensure `id-token: write` permission (already in workflow)

### SLSA workflow doesn't run
**Fix**: Only runs on releases. Create a release to trigger it.

### CodeQL takes too long
**Normal**: First run can take 10-15 minutes. Subsequent runs are faster.

### Dependabot PRs not appearing
**Wait**: Can take up to 24 hours after enabling. Check Settings → Security → Dependabot alerts.

---

## 📚 Key Concepts

### Artifact Signing
Cryptographically proves that an artifact was built by your CI/CD system and hasn't been tampered with.

### Sigstore
Keyless signing service that uses OIDC (no private keys to manage). Public transparency log for verifiability.

### SLSA (Supply-chain Levels for Software Artifacts)
Framework for ensuring software supply chain integrity. Level 3 means:
- Build process is isolated
- Provenance is generated automatically
- Provenance is tamper-proof

### GitHub Attestations
Native GitHub feature for linking artifacts to their source code and build process.

### Keyless Signing
Authentication via OIDC tokens instead of managing cryptographic keys. More secure and easier to manage.

---

## ✅ Policy Compliance Checklist

✅ **CI/CD Process Enabled**
- Automated builds configured
- Multiple trigger points (push, PR, release)
- Test and lint enforcement

✅ **Artifact Signing Implemented**
- Sigstore keyless signing
- GitHub attestations
- SLSA provenance
- Verification documentation

✅ **Security Scanning Active**
- Static analysis (CodeQL)
- Dependency scanning (Trivy)
- Regular scheduled scans
- PR security checks

✅ **Dependency Management**
- Automated updates (Dependabot)
- Vulnerability monitoring
- Multi-ecosystem support

---

## 🔗 Useful Links

- **Sigstore**: https://www.sigstore.dev/
- **SLSA**: https://slsa.dev/
- **GitHub Actions**: https://docs.github.com/en/actions
- **CodeQL**: https://codeql.github.com/
- **Dependabot**: https://docs.github.com/en/code-security/dependabot
- **Cosign CLI**: https://github.com/sigstore/cosign
- **SLSA Verifier**: https://github.com/slsa-framework/slsa-verifier

---

## 📝 Next Steps

1. ✅ Push configuration files to GitHub
2. ✅ Enable repository security settings
3. ✅ Create first release to test artifact signing
4. ✅ Monitor Actions tab for workflow execution
5. ✅ Review and merge first Dependabot PR
6. ✅ Check Security tab for CodeQL results
7. ✅ Download and verify a signed artifact

**Need help?** See [CI-CD-SETUP.md](CI-CD-SETUP.md) for detailed documentation.
