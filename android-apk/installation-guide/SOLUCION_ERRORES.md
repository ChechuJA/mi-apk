# 🛠️ Solución de Errores de Instalación APK

## 🚨 Errores Comunes y Soluciones

### Error: "No se puede instalar la aplicación"

#### Posibles Causas y Soluciones:

**1. Orígenes desconocidos no habilitados** ⚙️
- **Android 8.0+**: Ve a `Configuración` → `Apps` → `[Tu navegador/gestor de archivos]` → `Instalar aplicaciones desconocidas` → ✅ Activar
- **Android 7.0 y anteriores**: Ve a `Configuración` → `Seguridad` → ✅ `Orígenes desconocidos`

**2. Espacio insuficiente** 💾
```
Solución:
- Libera al menos 100 MB de espacio
- Ve a Configuración → Almacenamiento
- Elimina archivos innecesarios o apps no usadas
- Limpia la caché de aplicaciones
```

**3. Conflicto con versión anterior** 🔄
```
Solución:
- Desinstala cualquier versión anterior de "Bruno y Vega"
- Reinicia el dispositivo
- Vuelve a intentar la instalación
```

### Error: "Error al analizar el paquete"

**Causa más común**: APK corrupto o incompleto

```bash
Soluciones paso a paso:
1. Elimina el APK descargado actual
2. Limpia la caché del navegador
3. Vuelve a descargar desde GitHub Releases
4. Verifica el tamaño del archivo (debe ser ~930 KB)
5. Si persiste, prueba descargar desde otro dispositivo/red
```

### Error: "La aplicación no está instalada"

**Causas y soluciones**:

**1. Arquitectura incompatible** 📱
- Este APK es universal (ARM, ARM64, x86)
- Debería funcionar en todos los Android modernos
- Si falla, tu dispositivo puede tener una arquitectura muy antigua

**2. Versión de Android muy antigua** 📅
```
Requisitos mínimos:
✅ Android 5.0 (API 21) o superior
✅ 1 GB de RAM
✅ 50 MB de espacio libre

Verificar tu versión:
Configuración → Acerca del teléfono → Versión de Android
```

### Error: "Instalación bloqueada"

**Soluciones**:

**1. Google Play Protect** 🛡️
```
Pasos:
- Ve a Google Play Store
- Menú (≡) → Play Protect
- Configuración → Desactiva temporalmente
- Instala el APK
- Vuelve a activar Play Protect
```

**2. Antivirus de terceros** 🦠
```
Pasos:
- Desactiva temporalmente tu antivirus
- Instala el APK
- Agrega el APK a la lista blanca del antivirus
- Reactiva la protección
```

### Error: "La aplicación se cierra inmediatamente"

**Diagnóstico y soluciones**:

**1. Memoria insuficiente** 🧠
```
Soluciones:
- Cierra aplicaciones en segundo plano
- Reinicia el dispositivo
- Libera RAM (mínimo 1 GB recomendado)
```

**2. Conflicto de WebView** 🌐
```
Este APK usa WebView para funcionar:
- Actualiza Android System WebView en Play Store
- O actualiza Google Chrome (incluye WebView)
- Reinicia el dispositivo
```

**3. Permisos faltantes** 🔐
```
Verificar permisos:
- Ve a Configuración → Apps → Bruno y Vega
- Permisos → Verifica que tenga acceso a almacenamiento
- Habilita permisos necesarios
```

## 🔧 Herramientas de Diagnóstico

### Verificar APK antes de instalar

```bash
# Si tienes acceso a una PC con ADB:
adb install "Bruno y Vega-unsigned.apk"

# Esto te dará mensajes de error específicos
```

### Información del APK
```
Archivo: Bruno y Vega-unsigned.apk
Tamaño: ~930 KB (929.853 bytes)
Tipo: APK sin firmar
Arquitecturas: Universal (ARM, ARM64, x86)
Android mínimo: 5.0 (API 21)
Permisos: Internet, almacenamiento básico
```

### Hash de verificación
```bash
# Para verificar integridad del archivo:
sha256sum "Bruno y Vega-unsigned.apk"
# Debe coincidir con el hash publicado en releases
```

## ⚡ Solución Rápida (Checklist)

```
□ ¿Tienes Android 5.0 o superior?
□ ¿Tienes al menos 100 MB libres?
□ ¿Habilitaste "Orígenes desconocidos"?
□ ¿El archivo APK pesa ~930 KB?
□ ¿Descargaste desde GitHub oficial?
□ ¿Desinstalaste versiones anteriores?
□ ¿Reiniciaste el dispositivo?
□ ¿Play Protect está deshabilitado temporalmente?
```

## 🆘 Si Nada Funciona

### Opción 1: Instalar desde navegador web
```
🌐 Alternativa sin instalación:
Visita: https://chechuja.github.io/mi-apk/
- Funciona directamente en el navegador
- Mismos juegos, sin instalación
- Compatible con todos los dispositivos
```

### Opción 2: Reportar el problema
```
📧 Crear un issue en GitHub:
1. Ve a: https://github.com/ChechuJA/mi-apk/issues
2. Describe tu dispositivo:
   - Modelo y marca
   - Versión de Android
   - Mensaje de error exacto
   - Pasos que intentaste
```

### Información útil para reportar bugs
```
Incluye esta información:
- Dispositivo: [Ej: Samsung Galaxy S10]
- Android: [Ej: 11.0]
- Tamaño APK descargado: [Ej: 930 KB]
- Error exacto: [Copia el mensaje]
- Pasos intentados: [Lista lo que probaste]
```

## 🔍 Verificación Final

Una vez instalado correctamente:

✅ **La app debe**:
- Aparecer como "Bruno y Vega" en el drawer
- Abrir mostrando una lista de juegos
- Funcionar sin conexión a internet
- Ocupar aproximadamente 15-20 MB una vez instalada

❌ **Reporta si**:
- Los juegos no cargan
- La app se cierra inesperadamente  
- Aparecen errores de JavaScript
- Los controles táctiles no responden

---

**💡 Consejo**: La mayoría de errores se solucionan simplemente habilitando "Orígenes desconocidos" y teniendo suficiente espacio libre.

**🏆 ¡Una vez instalado, disfruta de los 27 juegos educativos completamente gratis!**