# 📱 Android 15 (API 35) Compatibility Guide

## 🎯 Overview

This project has been updated to support **Android 15 (API 35)** as the target platform while maintaining backward compatibility with Android 5.0 (API 21) and higher.

## 🔧 Technical Specifications

### SDK Versions
- **Minimum SDK:** API 21 (Android 5.0 Lollipop)
- **Target SDK:** API 35 (Android 15)
- **Compile SDK:** API 35 (Android 15)

### Build Tools
- **Android Gradle Plugin (AGP):** 8.6.1
- **Gradle:** 8.10.2
- **Kotlin:** 1.9.25
- **Java:** 17 (source and target compatibility)

### Android Build Tools
- **Build Tools Version:** 35.0.0
- **Platform Tools:** Latest

## ✨ Android 15 Features Supported

### 1. Privacy and Security Enhancements
- ✅ Updated permissions model for Android 15
- ✅ Scoped storage compliance
- ✅ Background location restrictions

### 2. Performance Optimizations
- ✅ WebView optimizations for better HTML5 game performance
- ✅ Memory management improvements
- ✅ Battery optimization compatibility

### 3. User Interface
- ✅ Edge-to-edge display support
- ✅ Dynamic color scheme (Material You)
- ✅ Predictive back gesture support
- ✅ Full-screen immersive mode

## 🛠️ Building the APK

### Prerequisites
1. **Java Development Kit (JDK) 17+**
   ```bash
   java -version  # Should show version 17 or higher
   ```

2. **Android SDK with API 35**
   ```bash
   sdkmanager "platforms;android-35" "build-tools;35.0.0"
   ```

### Local Build

1. **Navigate to android-wrapper directory:**
   ```bash
   cd android-wrapper
   ```

2. **Build the release APK:**
   ```bash
   ./gradlew assembleRelease
   ```

3. **Find the output:**
   ```bash
   app/build/outputs/apk/release/app-release-unsigned.apk
   ```

### CI/CD Build (GitHub Actions)

The project uses GitHub Actions for automated builds. The workflow:

1. **Sets up the environment:**
   - Java 17
   - Android SDK API 35
   - Build tools 35.0.0

2. **Copies web assets** into the Android wrapper

3. **Creates launcher icons** from project icons

4. **Builds the APK** using Gradle

5. **Signs the APK** with a keystore

6. **Uploads the artifact** for download

## 🔐 APK Signing

### Development Signing

For testing, a development keystore is automatically generated:

```bash
keytool -genkey -noprompt -v \
  -keystore release.keystore \
  -alias brunoVegaDevKey \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -storepass devBrunoVega123 \
  -keypass devBrunoVega123 \
  -dname "CN=Bruno y Vega, OU=Dev, O=BrunoVega, L=Madrid, ST=Madrid, C=ES"
```

### Production Signing

For production releases, store your keystore as GitHub Secrets:

1. **APK_KEYSTORE_BASE64** - Base64 encoded keystore file
2. **APK_KEY_ALIAS** - Key alias
3. **APK_KEYSTORE_PASSWORD** - Keystore password
4. **APK_KEY_PASSWORD** - Key password

The workflow will automatically use production credentials if available.

### Manual Signing

1. **Align the APK:**
   ```bash
   zipalign -p 4 app-release-unsigned.apk app-release-aligned.apk
   ```

2. **Sign the APK:**
   ```bash
   apksigner sign \
     --ks release.keystore \
     --ks-pass pass:YourPassword \
     --key-pass pass:YourPassword \
     --out app-release-signed.apk \
     app-release-aligned.apk
   ```

3. **Verify the signature:**
   ```bash
   apksigner verify --verbose app-release-signed.apk
   ```

## 📱 Testing on Android 15 Devices

### Physical Device Testing

1. **Enable Developer Options:**
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times

2. **Enable USB Debugging:**
   - Settings → System → Developer Options
   - Enable "USB debugging"

3. **Install via ADB:**
   ```bash
   adb install -r Bruno_y_Vega_signed.apk
   ```

4. **View logs:**
   ```bash
   adb logcat | grep BrunoVegaWebView
   ```

### Emulator Testing

1. **Create an Android 15 emulator:**
   ```bash
   avdmanager create avd -n Android15 -k "system-images;android-35;google_apis;x86_64"
   ```

2. **Start the emulator:**
   ```bash
   emulator -avd Android15
   ```

3. **Install the APK:**
   ```bash
   adb install app-release-signed.apk
   ```

## 🎮 Game Compatibility

All games have been tested for compatibility with Android 15:

### WebView Compatibility
- ✅ HTML5 Canvas rendering
- ✅ Touch event handling
- ✅ JavaScript execution
- ✅ Local storage
- ✅ Service Worker (for offline support)

### Mobile Controls
- ✅ Touch controls optimized for Android 15
- ✅ Gesture navigation compatibility
- ✅ Edge-to-edge display support
- ✅ Orientation changes handled

## 🐛 Known Issues and Solutions

### Issue: APK not installing
**Solution:** Enable "Install from Unknown Sources" in Settings → Security

### Issue: WebView content not loading
**Solution:** Check logcat for errors:
```bash
adb logcat | grep BrunoVegaWebView
```

### Issue: Performance issues on older devices
**Solution:** The APK is optimized for Android 15 but maintains compatibility with API 21+. Older devices may experience reduced performance.

## 📊 Version Information

### Current Version
- **Version Code:** Auto-generated (format: `YYDDDDHHMM`)
- **Version Name:** `YYYYMMDD-HHMMSS-SHA`

Example: `v20251015-101530-abc1234`

### Release Notes Location
- `android-apk/releases/VERSION_INFO.md`
- `android-apk/releases/CHANGELOG.md`

## 🔄 Migration from Android Studio

This project **no longer requires Android Studio**. All builds are performed using:

1. **Gradle command line** for local development
2. **GitHub Actions** for CI/CD

### Previous Approach (Deprecated)
- ❌ Manual APK creation with Android Studio
- ❌ Custom build scripts
- ❌ Manual signing

### Current Approach
- ✅ Gradle build automation
- ✅ GitHub Actions CI/CD
- ✅ Automated signing
- ✅ Proper Android project structure

## 📚 Additional Resources

- [Android 15 Release Notes](https://developer.android.com/about/versions/15)
- [AGP 8.6 Release Notes](https://developer.android.com/build/releases/gradle-plugin)
- [WebView Developer Guide](https://developer.android.com/develop/ui/views/layout/webapps/webview)
- [Android App Signing](https://developer.android.com/studio/publish/app-signing)

## 🤝 Contributing

To add new games or features:

1. Add game HTML/JS files to the project root
2. CI/CD will automatically include them in the APK
3. Test on Android 15 devices
4. Verify backward compatibility with older Android versions

## 📞 Support

For issues or questions:
- Check `RESOLUCION_ISSUE_*.md` files for previous solutions
- Review GitHub Actions workflow logs
- File an issue in the repository
