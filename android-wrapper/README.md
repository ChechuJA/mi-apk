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

### Opción 1: Script automatizado (recomendado)
Desde el directorio raíz del repositorio:
```bash
./build-apk.sh
```
Este script copia los assets web y construye el APK automáticamente.

### Opción 2: Build manual
Desde `android-wrapper/`:
```bash
# 1. Copiar assets web manualmente
mkdir -p app/src/main/assets
cp ../*.html ../*.js ../*.css ../*.json app/src/main/assets/
cp -r ../assets app/src/main/assets/

# 2. Construir APK
./gradlew assembleRelease
```

APK resultante:
```
app/build/outputs/apk/release/app-release-unsigned.apk
```

**Nota**: El APK sin firmar funciona para desarrollo. Para producción, debe firmarse con `apksigner`.
