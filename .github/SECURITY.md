# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it by:

1. **DO NOT** open a public issue
2. Email the maintainers directly or use GitHub's private vulnerability reporting
3. Include detailed steps to reproduce the vulnerability
4. Provide any potential fixes or suggestions

We will respond within 48 hours and work to address the issue promptly.

## Security Measures

This project implements the following security measures:

### Build Security
- **CI/CD Pipeline**: Automated builds and tests via GitHub Actions
- **Artifact Signing**: All release artifacts are signed using Sigstore
- **SLSA Provenance**: SLSA Level 3 build provenance for supply chain security
- **Build Attestation**: GitHub's native artifact attestation for verification

### Dependency Management
- **Dependabot**: Automated dependency updates
- **Dependency Review**: PR checks for vulnerable dependencies
- **Version Pinning**: Dependencies are version-locked in package-lock.json

### Code Security
- **CodeQL Analysis**: Automated code scanning for vulnerabilities
- **Trivy Scanning**: Container and filesystem vulnerability scanning
- **Security Advisories**: Monitoring via GitHub Security Advisories

### Access Control
- **Principle of Least Privilege**: Workflows run with minimal required permissions
- **OIDC Authentication**: Token-less authentication for cloud deployments
- **Protected Branches**: Main branch requires PR reviews

## Verifying Artifacts

### Verify Signed Artifacts with Sigstore

```bash
# Install cosign
brew install cosign  # macOS
# or download from: https://github.com/sigstore/cosign/releases

# Verify the artifact signature
cosign verify-blob \
  --signature build-artifacts.tar.gz.sig \
  --certificate build-artifacts.tar.gz.cert \
  build-artifacts.tar.gz
```

### Verify SLSA Provenance

```bash
# Install slsa-verifier
curl -Lo slsa-verifier https://github.com/slsa-framework/slsa-verifier/releases/download/v2.4.1/slsa-verifier-linux-amd64
chmod +x slsa-verifier

# Verify the artifact
./slsa-verifier verify-artifact riansrespiteweb-v*.tar.gz \
  --provenance-path riansrespiteweb-v*.tar.gz.intoto.jsonl \
  --source-uri github.com/YOURUSERNAME/RiansRespiteWeb \
  --source-tag v*.*.*
```

### Verify Checksums

```bash
# Verify SHA256 checksums
sha256sum -c checksums.txt
```

## Security Best Practices for Contributors

1. **Keep Dependencies Updated**: Regularly review and update dependencies
2. **Run Security Scans Locally**: Use `npm audit` before committing
3. **Follow Secure Coding**: Sanitize inputs, validate data, use parameterized queries
4. **Review Third-Party Code**: Audit dependencies and libraries before adding
5. **Use Environment Variables**: Never commit secrets or API keys
6. **Enable 2FA**: Require two-factor authentication for all contributors

## Compliance

This project follows:
- GitHub Security Best Practices
- SLSA Framework (Supply chain Levels for Software Artifacts)
- OpenSSF Scorecard recommendations
- OWASP security guidelines for web applications
