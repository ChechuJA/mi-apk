#!/bin/bash

# Build script for Bruno y Vega APK
# This script builds the APK locally using the android-wrapper Gradle project
# It mimics the GitHub Actions workflow for local development

set -e

echo "🚀 Building Bruno y Vega APK"
echo "=============================="

# Check if we're in the right directory
if [ ! -d "android-wrapper" ]; then
    echo "❌ Error: android-wrapper directory not found"
    echo "Please run this script from the repository root"
    exit 1
fi

# Check for required tools
if ! command -v java &> /dev/null; then
    echo "❌ Error: Java not found. Please install Java 17 or higher"
    exit 1
fi

echo ""
echo "📦 Step 1: Copying web assets to android-wrapper"
echo "=================================================="
WRAPPER=android-wrapper/app/src/main/assets
mkdir -p "$WRAPPER"

# Copy HTML, JS, CSS, JSON files
echo "  - Copying HTML, JS, CSS, JSON files..."
for f in *.html *.js *.css *.json; do
    if [ -f "$f" ]; then
        cp "$f" "$WRAPPER/"
        echo "    ✓ $f"
    fi
done

# Copy assets directory
if [ -d "assets" ]; then
    echo "  - Copying assets directory..."
    mkdir -p "$WRAPPER/assets"
    cp -r assets/* "$WRAPPER/assets/"
    echo "    ✓ assets/"
fi

echo ""
echo "🎨 Step 2: Setting up launcher icons"
echo "======================================"
ICON_SRC=icons/icon-192x192.png
if [ -f "$ICON_SRC" ]; then
    echo "  - Creating mipmap icons from $ICON_SRC"
    for density in mdpi hdpi xhdpi xxhdpi xxxhdpi; do
        DIR=android-wrapper/app/src/main/res/mipmap-$density
        mkdir -p "$DIR"
        cp "$ICON_SRC" "$DIR/ic_launcher.png"
        echo "    ✓ mipmap-$density/ic_launcher.png"
    done
else
    echo "  ⚠️  Warning: $ICON_SRC not found, using default icons"
fi

echo ""
echo "🔧 Step 3: Making gradlew executable"
echo "======================================"
chmod +x android-wrapper/gradlew || true
echo "  ✓ gradlew is executable"

echo ""
echo "🛠️  Step 4: Building APK with Gradle"
echo "======================================"
cd android-wrapper
./gradlew clean assembleRelease --no-daemon

echo ""
echo "✅ Build complete!"
echo "=================="
APK_PATH="app/build/outputs/apk/release/app-release-unsigned.apk"
if [ -f "$APK_PATH" ]; then
    echo ""
    echo "📦 APK Location:"
    echo "   $(pwd)/$APK_PATH"
    echo ""
    echo "📊 APK Size:"
    ls -lh "$APK_PATH" | awk '{print "   " $5}'
    echo ""
    echo "ℹ️  Note: This is an unsigned APK for development"
    echo "   To install on a device, you may need to sign it"
    echo ""
    echo "🔐 To sign the APK, run:"
    echo "   ./sign-apk.sh"
else
    echo "❌ Error: APK not found at expected location"
    exit 1
fi
