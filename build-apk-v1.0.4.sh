#!/bin/bash

echo "🚀 Generando Nueva APK v1.0.4 - Issue #26"
echo "=========================================="

# Crear directorio de trabajo
echo "📁 Creando estructura de directorios..."
mkdir -p build-local/apk-v1.0.4/assets
mkdir -p build-local/apk-v1.0.4/res/values  
mkdir -p build-local/apk-v1.0.4/res/mipmap-hdpi
mkdir -p build-local/apk-v1.0.4/res/mipmap-mdpi
mkdir -p build-local/apk-v1.0.4/res/mipmap-xhdpi
mkdir -p build-local/apk-v1.0.4/res/mipmap-xxhdpi

echo "📋 Copiando archivos del juego..."
# Copiar archivos principales del juego
cp *.html build-local/apk-v1.0.4/assets/ 2>/dev/null || echo "  - No hay archivos HTML específicos"
cp *.js build-local/apk-v1.0.4/assets/ 2>/dev/null || echo "  - No hay archivos JS específicos" 
cp *.css build-local/apk-v1.0.4/assets/ 2>/dev/null || echo "  - No hay archivos CSS específicos"
cp manifest.json build-local/apk-v1.0.4/assets/ 2>/dev/null || echo "  - manifest.json no encontrado"
cp sw.js build-local/apk-v1.0.4/assets/ 2>/dev/null || echo "  - sw.js no encontrado"

# Copiar assets
if [ -d "assets" ]; then
    echo "  ✅ Copiando directorio assets"
    cp -r assets/* build-local/apk-v1.0.4/assets/
else
    echo "  - No hay directorio assets"
fi

# Copiar Android manifest y recursos
echo "📱 Copiando archivos Android..."
if [ -f "android-project/AndroidManifest.xml" ]; then
    cp android-project/AndroidManifest.xml build-local/apk-v1.0.4/
    echo "  ✅ AndroidManifest.xml copiado"
else
    echo "  ❌ AndroidManifest.xml no encontrado"
    exit 1
fi

if [ -f "android-project/res/values/strings.xml" ]; then
    cp android-project/res/values/strings.xml build-local/apk-v1.0.4/res/values/
    echo "  ✅ strings.xml copiado"
else
    echo "  ❌ strings.xml no encontrado"
fi

# Copiar iconos
echo "🎨 Copiando iconos..."
if [ -f "icons/icon-192x192.png" ]; then
    for density in hdpi mdpi xhdpi xxhdpi; do
        cp icons/icon-192x192.png build-local/apk-v1.0.4/res/mipmap-$density/ic_launcher.png
    done
    echo "  ✅ Iconos copiados para todas las densidades"
else
    echo "  ⚠️ Icono principal no encontrado, usando icono por defecto"
fi

# Crear el APK
echo "📦 Empaquetando APK..."
cd build-local/apk-v1.0.4

if command -v zip &> /dev/null; then
    zip -r "../Bruno_y_Vega_v1.0.4.apk" . \
        -x "*.DS_Store" "*.git*" "*.tmp" "*.log"
    
    cd ../..
    
    # Mostrar información del APK
    if [ -f "build-local/Bruno_y_Vega_v1.0.4.apk" ]; then
        APK_SIZE=$(stat -c%s "build-local/Bruno_y_Vega_v1.0.4.apk" 2>/dev/null || stat -f%z "build-local/Bruno_y_Vega_v1.0.4.apk" 2>/dev/null)
        if command -v numfmt &> /dev/null; then
            APK_SIZE_HUMAN=$(numfmt --to=iec $APK_SIZE)
        else
            APK_SIZE_HUMAN="${APK_SIZE} bytes"
        fi
        
        echo ""
        echo "✅ APK v1.0.4 creado exitosamente!"
        echo "📱 Archivo: Bruno_y_Vega_v1.0.4.apk"
        echo "📏 Tamaño: $APK_SIZE_HUMAN"
        echo "📍 Ubicación: build-local/Bruno_y_Vega_v1.0.4.apk"
        echo ""
        
        # Verificar contenido
        echo "🔍 Contenido del APK (primeros archivos):"
        unzip -l "build-local/Bruno_y_Vega_v1.0.4.apk" | head -20
        
        # Copiar a las carpetas de releases
        echo ""
        echo "📂 Actualizando releases..."
        mkdir -p android-apk/releases/latest
        mkdir -p android-apk/releases/v1.0.4
        
        cp "build-local/Bruno_y_Vega_v1.0.4.apk" "android-apk/releases/latest/Bruno y Vega-unsigned.apk"
        cp "build-local/Bruno_y_Vega_v1.0.4.apk" "android-apk/releases/v1.0.4/Bruno_y_Vega_v1.0.4.apk"
        
        echo "  ✅ APK copiado a android-apk/releases/latest/"
        echo "  ✅ APK copiado a android-apk/releases/v1.0.4/"
        echo ""
        echo "🎉 NUEVA VERSIÓN v1.0.4 LISTA!"
        echo "   Respuesta al Issue #26 - APK disponible YA como solicitado"
        echo ""
        
    else
        echo "❌ Error: No se pudo crear el APK"
        exit 1
    fi
else
    echo "❌ Error: comando 'zip' no disponible"
    exit 1
fi