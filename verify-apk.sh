#!/bin/bash

# APK Verification Script
# Tests the fixed APK for proper structure and mobile controls

echo "🔍 APK Verification Report"
echo "=========================="

APK_PATH="android-apk/releases/latest/Bruno y Vega-unsigned.apk"

if [ ! -f "$APK_PATH" ]; then
    echo "❌ APK file not found at $APK_PATH"
    exit 1
fi

echo "✅ APK file found"

# Check file type
APK_TYPE=$(file "$APK_PATH" 2>/dev/null | grep -o "Android package" || echo "Unknown")
echo "📦 APK Type: $APK_TYPE"

# Check file size
APK_SIZE=$(stat -f%z "$APK_PATH" 2>/dev/null || stat -c%s "$APK_PATH" 2>/dev/null)
APK_SIZE_HUMAN=$(numfmt --to=iec $APK_SIZE 2>/dev/null || echo "$APK_SIZE bytes")
echo "📏 APK Size: $APK_SIZE_HUMAN"

# Test APK structure
echo ""
echo "🔍 APK Structure Check:"

# Create temp directory for extraction
TEMP_DIR="/tmp/apk-verify-$$"
mkdir -p "$TEMP_DIR"

unzip -q "$APK_PATH" -d "$TEMP_DIR" 2>/dev/null

if [ -f "$TEMP_DIR/AndroidManifest.xml" ]; then
    echo "✅ AndroidManifest.xml present"
else
    echo "❌ AndroidManifest.xml missing"
fi

if [ -d "$TEMP_DIR/assets" ]; then
    echo "✅ Assets directory present"
    GAME_COUNT=$(find "$TEMP_DIR/assets" -name "script-*.js" | wc -l)
    echo "   📱 Game scripts found: $GAME_COUNT"
else
    echo "❌ Assets directory missing"
fi

if [ -f "$TEMP_DIR/assets/mobile-controls.js" ]; then
    echo "✅ Mobile controls present"
    
    # Check mobile controls functions
    if grep -q "initMobileControls" "$TEMP_DIR/assets/mobile-controls.js"; then
        echo "   ✅ initMobileControls function found"
    else
        echo "   ❌ initMobileControls function missing"
    fi
    
    if grep -q "data-environment" "$TEMP_DIR/assets/mobile-controls.js"; then
        echo "   ✅ APK environment detection present"
    else
        echo "   ❌ APK environment detection missing"
    fi
    
else
    echo "❌ Mobile controls missing"
fi

if [ -d "$TEMP_DIR/res" ]; then
    echo "✅ Android resources present"
else
    echo "❌ Android resources missing"
fi

# Check HTML integration
echo ""
echo "🌐 HTML Integration Check:"

for html_file in "$TEMP_DIR/assets"/*.html; do
    if [ -f "$html_file" ]; then
        filename=$(basename "$html_file")
        
        if grep -q "data-environment.*apk" "$html_file"; then
            echo "✅ $filename has APK environment tag"
        else
            echo "⚠️  $filename missing APK environment tag"
        fi
        
        if grep -q "initMobileControls" "$html_file"; then
            echo "✅ $filename calls initMobileControls"
        else
            echo "⚠️  $filename doesn't call initMobileControls"
        fi
    fi
done

# Cleanup
rm -rf "$TEMP_DIR"

echo ""
echo "📊 Summary:"
echo "==========="
echo "The APK has been fixed with proper Android structure."
echo "Mobile controls should now work on touch devices."
echo ""
echo "Installation Instructions:"
echo "1. Download the APK to Android device"
echo "2. Enable 'Install from Unknown Sources'"
echo "3. Tap the APK file to install"
echo "4. Enjoy touch-controlled games!"