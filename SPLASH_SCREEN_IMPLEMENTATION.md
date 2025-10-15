# Version Splash Screen Implementation

## Overview
This document describes the implementation of the version splash screen feature requested in the issue.

## Requirements (from issue)
1. ✅ The **first thing** visible when opening the APK should be the **version** (v1.0.0)
2. ✅ When the user **taps the screen**, the version should disappear
3. ✅ The **game selection menu** should appear after dismissing the splash

## Implementation

### Visual Design
- **Background**: Beautiful gradient from blue (#667eea) to purple (#764ba2)
- **Title**: "Bruno y Vega" in large, bold white text (48px)
- **Version**: "v1.0.0" displayed prominently (24px)
- **Hint**: "Toca la pantalla para continuar" with fade animation
- **Animations**: 
  - Fade-in on load (0.5s)
  - Pulsing effect on content (2s loop)
  - Fade animation on hint text (2s loop)

### Technical Implementation

#### CSS (Added to all HTML files)
```css
#versionSplash {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 9999;
  cursor: pointer;
  animation: fadeIn 0.5s ease-in;
}

#versionSplash.hidden {
  display: none;
}
```

#### HTML Structure
```html
<div id="versionSplash">
  <div class="version-content">
    <div class="version-title">Bruno y Vega</div>
    <div class="version-subtitle">v1.0.0</div>
    <div class="tap-hint">Toca la pantalla para continuar</div>
  </div>
</div>
```

#### JavaScript Handler
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const versionSplash = document.getElementById('versionSplash');
  
  function hideSplash() {
    versionSplash.classList.add('hidden');
  }
  
  // Hide on click/tap
  versionSplash.addEventListener('click', hideSplash);
  versionSplash.addEventListener('touchstart', hideSplash);
});
```

## Files Modified
1. `index.html` - Root HTML file
2. `index-mobile.html` - Main mobile HTML file
3. `build-local/apk-v1.0.4/assets/index.html` - APK fallback
4. `build-local/apk-v1.0.4/assets/index-mobile.html` - APK primary file

## APK Build
- **Location**: `build-local/Bruno_y_Vega_v1.0.4.apk`
- **Size**: 5.4MB
- **Build Date**: October 15, 2025
- **Version Displayed**: v1.0.0 (as requested)
- **APK Version**: v1.0.4

## Testing
- ✅ Splash screen displays correctly on load
- ✅ Version v1.0.0 is prominently visible
- ✅ Tap/click interaction works smoothly
- ✅ Game menu appears after dismissing splash
- ✅ APK contains updated HTML files
- ✅ Animations work as expected

## User Experience Flow
1. User opens the APK
2. **Splash screen appears** showing:
   - "Bruno y Vega" title
   - "v1.0.0" version
   - "Toca la pantalla para continuar" hint
3. User taps anywhere on the screen
4. **Splash screen disappears** instantly
5. **Game selection menu appears** with all available games

## Screenshots

### Splash Screen (Initial View)
![Splash Screen](https://github.com/user-attachments/assets/a05ce160-4041-4259-b11a-74b112021c8e)

The splash screen shows the app name and version with a beautiful gradient background.

### Game Menu (After Tap)
![Game Menu](https://github.com/user-attachments/assets/ed0f612a-69a0-43ad-9b8e-26ec289a9dc6)

After tapping, the game selection menu appears with all available games.

## Notes
- The splash screen uses `z-index: 9999` to ensure it appears above all other content
- Both click and touchstart events are handled for maximum compatibility
- The implementation is minimal and doesn't interfere with existing functionality
- The version "v1.0.0" is hardcoded as specifically requested in the issue
