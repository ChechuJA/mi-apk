# Disabled Workflows

The following workflows have been temporarily disabled due to YAML syntax issues with here-document formatting:

## Disabled Files
- `enhanced-build-system.yml.disabled` - Complex build system with multiple here-documents
- `proper-apk-build.yml.disabled` - PWA-to-APK build system  
- `auto-version-release.yml.disabled` - Automatic versioning and release system

## Issue
These workflows contain bash here-documents (e.g., `cat > file << EOF`) where the content is not properly indented for YAML parsing. The XML and text content in the here-documents starts at column 1, but YAML expects it to be indented to match the surrounding shell script context.

## Error Pattern
```
ScannerError: while scanning a simple key
could not find expected ':'
```

## Solution Required
To re-enable these workflows, the here-document content needs to be properly indented or converted to a different approach (e.g., echo statements, external files, or properly quoted strings).

## Active Workflows
The core functionality remains available through these working workflows:
- `fix-apk-build.yml` - Fixed primary APK builder ✅
- `nueva-version-apk.yml` - New version APK builder ✅  
- `quick-validation.yml` - Basic APK validation ✅
- Other supporting workflows (testing, signing, etc.) ✅

## Issue Fixed
- **Primary Issue**: Fixed circular copy error in `fix-apk-build.yml` that was causing build failures
- **Secondary Issue**: Disabled problematic workflows to prevent syntax errors from blocking repository operations