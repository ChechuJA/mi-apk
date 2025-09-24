# Android Wrapper

Este módulo Android genera una APK nativa que envuelve los juegos HTML/JS del proyecto principal usando un WebView.

## Estructura
- app/src/main/assets/ -> se copiarán los archivos del proyecto raíz (HTML, JS, CSS, assets)
- MainActivity.kt -> carga `file:///android_asset/index.html`

## Build local
Desde `android-wrapper/`:
```
./gradlew assembleRelease
```
APK resultante:
```
app/build/outputs/apk/release/app-release-unsigned.apk
```
Luego se firma con `apksigner`.
