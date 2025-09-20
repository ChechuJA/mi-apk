#!/bin/bash

# generar_apk.sh - Script para generar APK desde PWA
# Mi Primera APK de Juegos

echo "🎮 ==============================================="
echo "    GENERADOR DE APK - Mi Primera App de Juegos"
echo "==============================================="
echo ""

# Verificar que existe la carpeta www
if [ ! -d "www" ]; then
    echo "❌ Error: No se encuentra la carpeta 'www'"
    echo "   Asegúrate de ejecutar este script desde la raíz del proyecto"
    exit 1
fi

echo "Selecciona el método para generar tu APK:"
echo ""
echo "1. 🔨 Cordova/PhoneGap (Método avanzado - requiere instalación local)"
echo "2. 🌐 PWA2APK (Método más sencillo - recomendado para principiantes)"
echo "3. 📱 Android Studio (Método completo para desarrolladores)"
echo "4. 🚀 GitHub Pages + PWA2APK (Método automatizado completo)"
echo ""

read -p "Ingresa tu opción (1-4): " opcion

case $opcion in
    1)
        echo ""
        echo "🔨 MÉTODO CORDOVA/PHONEGAP"
        echo "=========================="
        echo ""
        echo "Este método requiere instalaciones locales:"
        echo "1. Node.js y npm"
        echo "2. Cordova CLI: npm install -g cordova"
        echo "3. Android SDK y Java JDK"
        echo ""
        echo "Pasos a seguir:"
        echo "1. cordova create mi-apk-cordova com.miapp.juegos MiAPKJuegos"
        echo "2. Copiar contenido de www/ a mi-apk-cordova/www/"
        echo "3. cd mi-apk-cordova"
        echo "4. cordova platform add android"
        echo "5. cordova build android"
        echo ""
        echo "⚠️  Este método es más complejo pero ofrece más control."
        ;;
        
    2)
        echo ""
        echo "🌐 MÉTODO PWA2APK (RECOMENDADO)"
        echo "==============================="
        echo ""
        echo "Este es el método MÁS SENCILLO para principiantes:"
        echo ""
        echo "PASO 1: Subir tu PWA a internet"
        echo "--------------------------------"
        echo "Puedes usar cualquiera de estos servicios GRATUITOS:"
        echo ""
        echo "📌 OPCIÓN A - GitHub Pages (Recomendado):"
        echo "   1. Ve a: https://github.com/settings/pages"
        echo "   2. En 'Source' selecciona: 'Deploy from a branch'"
        echo "   3. Selecciona la rama 'main' o 'master'"
        echo "   4. Carpeta: '/ (root)' o '/www' si configuraste un subdirectorio"
        echo "   5. Clic en 'Save'"
        echo "   6. Tu sitio estará disponible en: https://tu-usuario.github.io/mi-apk"
        echo ""
        echo "📌 OPCIÓN B - Netlify:"
        echo "   1. Ve a: https://www.netlify.com/"
        echo "   2. Arrastra la carpeta 'www' al área de deploy"
        echo "   3. Obtendrás una URL como: https://random-name.netlify.app"
        echo ""
        echo "📌 OPCIÓN C - Vercel:"
        echo "   1. Ve a: https://vercel.com/"
        echo "   2. Importa desde GitHub o sube la carpeta 'www'"
        echo "   3. Deploy automático"
        echo ""
        echo "PASO 2: Convertir a APK con PWA2APK"
        echo "------------------------------------"
        echo "1. Ve a: https://pwa2apk.com/"
        echo "2. Pega la URL donde publicaste tu PWA"
        echo "3. Completa la información de la app:"
        echo "   - Nombre: Mi Primera APK de Juegos"
        echo "   - Package ID: com.miapp.juegos"
        echo "   - Versión: 1.0"
        echo "4. Clic en 'Generate APK'"
        echo "5. Espera a que se genere (puede tomar varios minutos)"
        echo "6. Descarga tu APK"
        echo ""
        echo "PASO 3: Instalar en Android"
        echo "----------------------------"
        echo "1. Transfiere el APK a tu dispositivo Android"
        echo "2. Ve a Configuración > Seguridad"
        echo "3. Activa 'Fuentes desconocidas' o 'Instalar apps desconocidas'"
        echo "4. Usa un explorador de archivos para abrir el APK"
        echo "5. ¡Instala tu app!"
        echo ""
        echo "✅ Este método es GRATUITO y no requiere conocimientos técnicos."
        echo ""
        
        # Verificar si hay conexión a internet para hacer una verificación de PWA
        echo "🔍 VERIFICANDO TU PWA..."
        if [ -f "www/manifest.json" ] && [ -f "www/sw.js" ]; then
            echo "✅ manifest.json encontrado"
            echo "✅ Service Worker (sw.js) encontrado"
            echo "✅ Tu PWA está lista para convertir a APK"
        else
            echo "⚠️  Faltan algunos archivos PWA. Asegúrate de tener:"
            echo "   - www/manifest.json"
            echo "   - www/sw.js"
        fi
        echo ""
        echo "🌐 SERVICIOS ALTERNATIVOS A PWA2APK:"
        echo "   - https://appmaker.xyz/pwa-to-apk"
        echo "   - https://pwa-builder.com/ (Microsoft)"
        echo "   - https://gonative.io/ (Premium)"
        echo ""
        ;;
        
    3)
        echo ""
        echo "📱 MÉTODO ANDROID STUDIO"
        echo "========================"
        echo ""
        echo "Este método es para desarrolladores con experiencia:"
        echo ""
        echo "Requisitos:"
        echo "1. Android Studio instalado"
        echo "2. Android SDK configurado"
        echo "3. Conocimientos de desarrollo Android"
        echo ""
        echo "Pasos:"
        echo "1. Crear nuevo proyecto Android en Android Studio"
        echo "2. Agregar WebView al layout principal"
        echo "3. Configurar WebView para cargar tu PWA"
        echo "4. Copiar archivos www/ a assets/"
        echo "5. Configurar permisos en AndroidManifest.xml"
        echo "6. Build > Generate Signed Bundle / APK"
        echo ""
        echo "⚠️  Este método requiere experiencia en desarrollo Android."
        ;;
        
    4)
        echo ""
        echo "🚀 MÉTODO AUTOMATIZADO COMPLETO"
        echo "==============================="
        echo ""
        echo "Este método combina GitHub Pages + PWA2APK de forma automática:"
        echo ""
        echo "CONFIGURACIÓN AUTOMÁTICA DE GITHUB PAGES:"
        
        # Verificar si estamos en un repositorio git
        if [ -d ".git" ]; then
            echo "📁 Repositorio Git detectado"
            
            # Crear archivo de configuración para GitHub Pages
            echo "Creando configuración para GitHub Pages..."
            
            # Crear .github/workflows para automatizar el despliegue
            mkdir -p .github/workflows
            
            cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Pages
      uses: actions/configure-pages@v2
      
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v1
      with:
        path: './www'
        
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v1

permissions:
  contents: read
  pages: write
  id-token: write
EOF
            
            echo "✅ Archivo de GitHub Actions creado"
            
            # Crear archivo de configuración de Pages
            echo "www/" > .nojekyll
            
            # Obtener información del repositorio
            remote_url=$(git config --get remote.origin.url)
            if [[ $remote_url == *"github.com"* ]]; then
                # Extraer usuario y repositorio de la URL
                repo_info=$(echo $remote_url | sed 's/.*github\.com[:/]\([^/]*\)\/\([^/]*\)\.git.*/\1\/\2/' | sed 's/\.git$//')
                user=$(echo $repo_info | cut -d'/' -f1)
                repo=$(echo $repo_info | cut -d'/' -f2)
                
                echo ""
                echo "📋 INSTRUCCIONES PARA COMPLETAR EL DESPLIEGUE:"
                echo "=============================================="
                echo ""
                echo "1. Haz commit y push de estos cambios:"
                echo "   git add ."
                echo "   git commit -m 'Configurar GitHub Pages y PWA'"
                echo "   git push"
                echo ""
                echo "2. Ve a tu repositorio en GitHub:"
                echo "   https://github.com/$repo_info"
                echo ""
                echo "3. Ve a Settings > Pages"
                echo "4. En 'Source' selecciona 'GitHub Actions'"
                echo "5. El despliegue se activará automáticamente"
                echo ""
                echo "6. Tu PWA estará disponible en:"
                echo "   🌐 https://$user.github.io/$repo"
                echo ""
                echo "7. Una vez que esté online, ve a PWA2APK:"
                echo "   https://pwa2apk.com/"
                echo "   Introduce la URL: https://$user.github.io/$repo"
                echo ""
                echo "✅ ¡Tu APK se generará automáticamente!"
            else
                echo "⚠️  No se pudo detectar la URL del repositorio de GitHub"
                echo "   Configura manualmente GitHub Pages siguiendo el método 2"
            fi
            
        else
            echo "⚠️  No se detectó un repositorio Git"
            echo "   Inicializa Git y conecta con GitHub primero:"
            echo "   git init"
            echo "   git add ."
            echo "   git commit -m 'Initial commit'"
            echo "   git branch -M main"
            echo "   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git"
            echo "   git push -u origin main"
        fi
        ;;
        
    *)
        echo ""
        echo "❌ Opción no válida. Por favor selecciona 1, 2, 3 o 4."
        echo ""
        echo "💡 Para principiantes, se recomienda la opción 2 (PWA2APK)"
        exit 1
        ;;
esac

echo ""
echo "📚 RECURSOS ADICIONALES:"
echo "========================"
echo ""
echo "🔗 Documentación PWA:"
echo "   https://developer.mozilla.org/es/docs/Web/Progressive_web_apps"
echo ""
echo "🔗 Herramientas para PWA:"
echo "   https://web.dev/progressive-web-apps/"
echo ""
echo "🔗 Validador de PWA:"
echo "   https://web.dev/measure/ (introduce tu URL cuando esté online)"
echo ""
echo "🔗 Generadores de iconos:"
echo "   https://realfavicongenerator.net/"
echo "   https://www.favicon-generator.org/"
echo ""
echo "==============================================="
echo "✨ ¡Buena suerte creando tu primera APK! ✨"
echo "==============================================="