# 🎨 Recursos y Assets

## 📦 Contenido de Assets

Esta carpeta contiene recursos adicionales para la aplicación "Juegos de Bruno y Vega".

### 🖼️ Iconos y Gráficos

#### Iconos de la Aplicación
Los iconos principales están en la carpeta `/icons/` del proyecto principal:
- `icon-72x72.png` - Para pantallas LDPI
- `icon-96x96.png` - Para pantallas MDPI  
- `icon-128x128.png` - Para notificaciones
- `icon-144x144.png` - Para pantallas HDPI
- `icon-152x152.png` - Para iPad
- `icon-192x192.png` - Para pantallas XHDPI
- `icon-384x384.png` - Para pantallas XXHDPI
- `icon-512x512.png` - Para pantallas XXXHDPI y stores

#### Assets de Juegos
Cada juego puede incluir sus propios recursos:
- 🎨 **Sprites** - Personajes y objetos
- 🖼️ **Fondos** - Imágenes de fondo
- 🎵 **Audio** - Efectos de sonido y música
- 🎯 **UI Elements** - Botones y elementos de interfaz

### 📱 Recursos para Diferentes Densidades

La aplicación está optimizada para diferentes densidades de pantalla:

| Densidad | Carpeta | Multiplicador | Iconos |
|----------|---------|---------------|---------|
| **LDPI** | `drawable-ldpi/` | 0.75x | 36x36px |
| **MDPI** | `drawable-mdpi/` | 1.0x | 48x48px |
| **HDPI** | `drawable-hdpi/` | 1.5x | 72x72px |
| **XHDPI** | `drawable-xhdpi/` | 2.0x | 96x96px |
| **XXHDPI** | `drawable-xxhdpi/` | 3.0x | 144x144px |
| **XXXHDPI** | `drawable-xxxhdpi/` | 4.0x | 192x192px |

### 🎨 Paleta de Colores

#### Colores Principales
- **Primario:** `#0d3d91` - Azul oscuro
- **Secundario:** `#1976d2` - Azul medio
- **Acento:** `#90caf9` - Azul claro
- **Fondo:** `#ffffff` - Blanco
- **Texto:** `#1d2833` - Gris oscuro

#### Colores por Juego
Cada juego tiene su propia paleta temática:
- 🏀 **Atrapa Bolas:** `#ff9800` (Naranja)
- 🐦 **Flappy Bird:** `#4caf50` (Verde)
- 🏍️ **Moto Desierto:** `#795548` (Marrón)
- 🧠 **Memoria:** `#9c27b0` (Morado)
- 🧮 **Math Catcher:** `#f44336` (Rojo)

### 📐 Dimensiones y Especificaciones

#### Pantallas Compatibles
- **Teléfonos:** 5" - 6.7"
- **Tablets:** 7" - 10"
- **Resoluciones:** 720x1280 hasta 1440x3200
- **Relación:** 16:9, 18:9, 19:9, 20:9

#### Canvas de Juego
- **Tamaño base:** 800x500px
- **Escalado:** Automático según pantalla
- **Orientación:** Adaptable (portrait/landscape)

### 🎵 Audio Assets

#### Efectos de Sonido
- 🔊 **Click/Tap** - Interacción con botones
- 🎯 **Success** - Logro completado
- ❌ **Error** - Acción incorrecta
- 🏆 **Victory** - Nivel completado
- 💀 **Game Over** - Fin del juego

#### Especificaciones de Audio
- **Formato:** OGG Vorbis (preferido), MP3
- **Calidad:** 44.1kHz, 16-bit
- **Duración:** 0.1-3 segundos para efectos
- **Volumen:** Normalizado a -12dB

### 🎯 Assets de UI

#### Botones
- **Tamaños:** 40x40dp (pequeño), 56x56dp (mediano), 72x72dp (grande)
- **Estados:** Normal, Pressed, Disabled
- **Estilo:** Material Design con esquinas redondeadas

#### Controles de Juego
- **Joystick virtual:** Círculo de 80dp con área táctil de 120dp
- **Botones de acción:** 64x64dp con feedback visual
- **Gestos:** Swipe, tap, long press, pinch

### 📁 Estructura de Carpetas Sugerida

```
assets/
├── icons/
│   ├── app-icons/          # Iconos de la aplicación
│   ├── game-icons/         # Iconos específicos de juegos
│   └── ui-icons/           # Iconos de interfaz
├── images/
│   ├── backgrounds/        # Fondos de pantalla
│   ├── sprites/           # Personajes y objetos
│   └── ui-elements/       # Elementos de interfaz
├── audio/
│   ├── sfx/               # Efectos de sonido
│   └── music/             # Música de fondo
└── fonts/                 # Fuentes personalizadas
```

### 🔧 Herramientas Recomendadas

#### Para Gráficos
- **Vector:** Adobe Illustrator, Inkscape
- **Raster:** Photoshop, GIMP, Figma
- **Sprites:** Aseprite, Piskel
- **Iconos:** IconJar, Nucleo

#### Para Audio
- **Edición:** Audacity (gratuito)
- **Profesional:** Adobe Audition
- **Generación:** Bfxr, ChipTone
- **Conversión:** FFmpeg

### 📋 Checklist de Assets

#### ✅ Disponibles
- [x] Iconos de aplicación (8 tamaños)
- [x] Manifest.json configurado
- [x] Service Worker para cache
- [x] CSS responsivo

#### 🔄 Pendientes
- [ ] Sprites de personajes
- [ ] Efectos de sonido
- [ ] Música de fondo
- [ ] Fondos específicos por juego
- [ ] Animaciones CSS

### 💡 Mejores Prácticas

#### Optimización
- 🗜️ **Comprimir imágenes** - Usar TinyPNG, ImageOptim
- 📏 **Vectorizar iconos** - SVG cuando sea posible
- 🎵 **Comprimir audio** - Balance entre calidad y tamaño
- 📱 **Considerar datos móviles** - Assets ligeros

#### Accesibilidad
- 🎨 **Contraste suficiente** - Mínimo 4.5:1
- 🔤 **Texto alternativo** - Para usuarios con discapacidades
- 📱 **Tamaños táctiles** - Mínimo 48x48dp
- 🌗 **Tema oscuro** - Considerar modo nocturno

---

**🎨 ¡Contribuye con nuevos assets para mejorar los juegos! 🚀**

*Para contribuir con assets, revisa las especificaciones y envía un Pull Request.*