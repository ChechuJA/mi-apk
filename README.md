# 🎮 Juegos de Bruno y Vega

Una colección de juegos educativos y divertidos desarrollada como Progressive Web App (PWA) que puede instalarse como aplicación Android nativa.

## 📱 Instalación en Android

### Opción 1: APK Directo (Recomendado)
📥 **[Descargar e Instalar APK](android-apk/)** 
- Tamaño: ~930 KB
- Compatible con Android 5.0+ (API 21)
- **Optimizado para Android 16 (API 36) y Samsung One UI 8.0**
- Sin publicidad, código abierto
- 27 juegos incluidos

### Opción 2: Navegador Web
🌐 **[Jugar Online](https://chechuja.github.io/mi-apk/)**
- Funciona en cualquier navegador moderno
- Experiencia PWA completa
- Se puede instalar como app web

## 🎯 Características

- ✅ **27 juegos diferentes** - Desde puzzles hasta acción
- ✅ **Educativo** - Matemáticas, memoria, lógica
- ✅ **Sin internet** - Funciona completamente offline
- ✅ **Controles táctiles** - Optimizado para móviles
- ✅ **Gratuito** - Sin ads ni compras dentro de la app
- ✅ **Código abierto** - Transparente y auditable

## 🚀 Desarrollo

Este proyecto utiliza tecnologías web modernas (HTML5, CSS3, JavaScript) con Service Worker para funcionalidad offline, empaquetado como APK nativo usando:

- **Android Gradle Plugin 8.7.3**
- **Gradle 8.10.2**
- **Target SDK:** Android 16 (API 36)
- **One UI:** Samsung One UI 8.0 optimizado
- **WebView** para renderizado de juegos

### 🛠️ Construcción del APK

#### Construcción Local
```bash
# Construir APK localmente
./build-apk.sh
```

El APK se generará en: `android-wrapper/app/build/outputs/apk/release/app-release-unsigned.apk`

#### Construcción Automática (GitHub Actions)
El APK se construye automáticamente en cada push a `main` usando el workflow `.github/workflows/build-real-apk.yml`

### 📚 Documentación Técnica

- [Android 16 Compatibility Guide](ANDROID_16_COMPATIBILITY.md) - Guía completa de compatibilidad con Android 16 y One UI 8.0
- [Testing Single Game](TESTING_SINGLE_GAME.md) - Pruebas con un juego individual
- [Android Wrapper README](android-wrapper/README.md) - Detalles del wrapper Android

## 📋 Próximos Pasos

Para desarrolladores y testers: **[Ver NEXT_STEPS.md](NEXT_STEPS.md)** (documentación técnica) para:
- ✅ Instrucciones de construcción automática de APK
- ✅ Guía de descarga desde GitHub Actions
- ✅ Procedimientos de instalación en Android 16 y One UI 8.0
- ✅ Testing del juego Flappy como prueba de concepto
- ✅ Validación completa de funcionalidad

---

**💡 Para instrucciones detalladas de instalación, visita la [carpeta android-apk](android-apk/)**
