# 🎮 Testing Single Game - Quick Start Guide

## 📋 Overview

This guide helps you test a **single game** first to verify the Android 15 APK build works correctly before expanding to all games.

## 🎯 Recommended Test Game: Flappy

**Why Flappy?**
- ✅ Simple controls (single tap)
- ✅ Good test for touch event handling
- ✅ Canvas rendering test
- ✅ Small asset size
- ✅ Quick load time

## 🛠️ Step 1: Create Test Branch

```bash
git checkout -b test-single-game-flappy
```

## 📝 Step 2: Create Minimal Test HTML

Create a simple launcher that only loads Flappy:

**File: `test-flappy-only.html`**
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Test Flappy - Android 15</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: #1a1a1a;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        #gameContainer {
            width: 100%;
            max-width: 800px;
            background: #2a2a2a;
        }
        canvas {
            display: block;
            width: 100% !important;
            height: auto !important;
            touch-action: none;
        }
    </style>
</head>
<body>
    <div id="gameContainer">
        <canvas id="gameCanvas" width="800" height="500"></canvas>
    </div>
    
    <!-- Game utilities -->
    <script src="game-utils.js"></script>
    
    <!-- Mobile controls -->
    <script src="mobile-controls.js"></script>
    
    <!-- Flappy game -->
    <script src="script-flappy.js"></script>
    
    <script>
        // Initialize on load
        window.addEventListener('load', () => {
            console.log('Test Flappy - Android 15 Build');
            console.log('Device:', navigator.userAgent);
            console.log('Viewport:', window.innerWidth, 'x', window.innerHeight);
            
            // Initialize mobile controls if available
            if (typeof initMobileControls === 'function') {
                initMobileControls();
            }
            
            // Start the game
            if (typeof registerGame === 'function') {
                registerGame();
            }
        });
        
        // Prevent default touch behaviors
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
    </script>
</body>
</html>
```

## 🔧 Step 3: Update MainActivity to Load Test File

Edit `android-wrapper/app/src/main/java/com/brunnovega/games/MainActivity.kt`:

Find the line:
```kotlin
val preferredFiles = listOf("menu-local.html", "index-games.html", "index-mobile.html", "index.html")
```

Change to:
```kotlin
val preferredFiles = listOf("test-flappy-only.html", "menu-local.html", "index-games.html", "index-mobile.html", "index.html")
```

## 📦 Step 4: Copy Only Required Assets

Modify the workflow to copy only Flappy game files:

**In `.github/workflows/build-real-apk.yml`**, update the "Copy Web Assets" step:

```yaml
- name: 📦 Copy Web Assets (Flappy Only - TEST)
  run: |
    WRAPPER=android-wrapper/app/src/main/assets
    mkdir -p "$WRAPPER"
    
    # Copy test launcher
    cp test-flappy-only.html "$WRAPPER/"
    
    # Copy required JS files
    cp game-utils.js "$WRAPPER/"
    cp mobile-controls.js "$WRAPPER/"
    cp script-flappy.js "$WRAPPER/"
    
    # Copy required CSS
    cp style.css "$WRAPPER/" 2>/dev/null || true
    
    # Copy minimal assets if needed
    if [ -d assets ]; then
      mkdir -p "$WRAPPER/assets"
      # Copy only assets needed by Flappy (if any)
    fi
```

## 🏗️ Step 5: Build Test APK

### Option A: GitHub Actions

1. Push the test branch:
   ```bash
   git add test-flappy-only.html
   git commit -m "Add test launcher for Flappy game only"
   git push origin test-single-game-flappy
   ```

2. Trigger the workflow:
   - Go to GitHub Actions
   - Run "Build Real APK" workflow
   - Download the generated APK

### Option B: Local Build (if network available)

```bash
cd android-wrapper
./gradlew assembleRelease
```

## 📱 Step 6: Test on Android 15 Device

### Install the APK

1. **Enable Developer Mode:**
   - Settings → About Phone → Tap "Build Number" 7 times

2. **Enable Unknown Sources:**
   - Settings → Security → Enable "Install Unknown Apps"

3. **Install via USB:**
   ```bash
   adb install -r Bruno_y_Vega_test_signed.apk
   ```

   Or transfer the APK to the device and install manually.

### Test Checklist

- [ ] **Launch:** App opens without crashes
- [ ] **Game Loads:** Flappy game appears on screen
- [ ] **Touch Controls:** Tap works to make bird fly
- [ ] **Graphics:** Canvas renders correctly
- [ ] **Performance:** Smooth 60 FPS gameplay
- [ ] **Screen Rotation:** Handles orientation changes
- [ ] **Memory:** No memory leaks after 5 minutes
- [ ] **Back Button:** Closes app or returns to menu

### Debug with ADB

```bash
# View app logs
adb logcat | grep BrunoVegaWebView

# View all logs
adb logcat *:E

# Clear logs before test
adb logcat -c
```

## 📊 Step 7: Verify Build Details

Check the APK information:

```bash
# APK size
ls -lh Bruno_y_Vega_test_signed.apk

# APK contents
unzip -l Bruno_y_Vega_test_signed.apk

# Verify signature
apksigner verify --verbose Bruno_y_Vega_test_signed.apk

# Check target SDK
aapt dump badging Bruno_y_Vega_test_signed.apk | grep "targetSdkVersion"
```

Expected output:
```
targetSdkVersion:'35'
```

## ✅ Success Criteria

The test is successful if:

1. ✅ APK installs on Android 15 device
2. ✅ App launches without errors
3. ✅ Flappy game loads and is playable
4. ✅ Touch controls work smoothly
5. ✅ No crashes or freezes
6. ✅ Performance is acceptable (>30 FPS)
7. ✅ Logs show no critical errors

## 🔄 Step 8: Scale to More Games

Once Flappy works, gradually add more games:

### Next Games to Test (in order)
1. **4 en Raya** - Simple tap interface
2. **Memoria** - Card matching game
3. **Quiz** - Text-based interaction
4. **Serpiente** - Directional controls
5. **Arkanoid** - Paddle controls
6. ... Continue with remaining games

### For Each New Game:

1. Add game files to assets
2. Add to launcher menu
3. Test individually
4. Document any issues
5. Move to next game

## 🐛 Troubleshooting

### Issue: APK won't install
**Check:**
- Android version (should be 5.0+)
- Available storage space
- Security settings

**Solution:**
```bash
adb install -r -d Bruno_y_Vega_test_signed.apk
```

### Issue: Black screen
**Check logs:**
```bash
adb logcat | grep -E "BrunoVega|chromium"
```

**Common causes:**
- Missing asset files
- JavaScript errors
- WebView not initialized

### Issue: Touch not working
**Check:**
- Mobile controls initialization
- Touch event listeners
- Canvas touch-action CSS

### Issue: Performance problems
**Check:**
- Device specs (RAM, CPU)
- Other apps running
- WebView debugging enabled

**Optimize:**
```javascript
// In MainActivity.kt, set:
WebView.setWebContentsDebuggingEnabled(false)  // Disable for production
```

## 📝 Test Report Template

After testing, document results:

```markdown
# Test Report: Flappy on Android 15

**Date:** YYYY-MM-DD
**Device:** [Device Model]
**Android Version:** 15 (API 35)
**APK Version:** [Version]

## Results

### Installation
- [x] Installed successfully
- [ ] Installation failed

### Functionality
- [x] Game loads
- [x] Touch controls work
- [x] Graphics render correctly
- [x] Sound works (if applicable)

### Performance
- FPS: [Average FPS]
- Load Time: [Seconds]
- Memory Usage: [MB]

### Issues Found
1. [Issue 1]
2. [Issue 2]

### Screenshots
[Attach screenshots]

### Conclusion
[PASS/FAIL] - Ready for more games
```

## 🎯 Next Steps After Success

1. **Merge test branch** to main
2. **Update workflow** to include all games
3. **Create game addition workflow** for easy scaling
4. **Document game-specific requirements**
5. **Create testing checklist** for each game

## 📚 References

- Main build workflow: `.github/workflows/build-real-apk.yml`
- Android wrapper: `android-wrapper/`
- Game scripts: `script-*.js`
- Mobile controls: `mobile-controls.js`
