# Android Wrapper

Este módulo Android genera una APK nativa que envuelve los juegos HTML/JS del proyecto principal usando un WebView.

## Compatibilidad
- **Android mínimo:** 5.0 (API 21)
- **Android objetivo:** 15 (API 35)
- **Compilación:** API 35 (Android 15)
- **AGP:** 8.6.1
- **Gradle:** 8.10.2
- **Kotlin:** 1.9.25

## Estructura
- app/src/main/assets/ -> se copiarán los archivos del proyecto raíz (HTML, JS, CSS, assets)
- MainActivity.kt -> carga `file:///android_asset/index.html`

## Build local
Desde `android-wrapper/`:
```bash
./gradlew assembleRelease
```
APK resultante:
```
app/build/outputs/apk/release/app-release-unsigned.apk
```
Luego se firma con `apksigner`.
