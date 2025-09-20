# Mi Primera APK de Juegos 🎮

Una Progressive Web App (PWA) de juegos que se puede convertir fácilmente en una APK para Android.

## 🎯 Características

- 🧠 **Juego de Memoria**: Encuentra las parejas de cartas
- 🐍 **Snake**: El clásico juego de la serpiente  
- ❓ **Quiz**: Responde preguntas divertidas
- 📱 **PWA Completa**: Funciona offline y se puede instalar
- 🔄 **Fácil conversión a APK**: Usando herramientas online

## 🚀 Cómo generar tu APK

### Método más sencillo (Recomendado para principiantes)

1. **Ejecuta el script generador:**
   ```bash
   ./generar_apk.sh
   ```

2. **Selecciona la opción 2 (PWA2APK)** para el método más sencillo

3. **Sigue las instrucciones** que aparecerán para:
   - Subir los archivos a GitHub Pages, Netlify o Vercel
   - Usar PWA2APK para convertir tu sitio en APK
   - Descargar e instalar el APK resultante

## 📁 Estructura del proyecto

```
mi-apk/
├── www/                    # Carpeta principal de la PWA
│   ├── index.html         # Página principal
│   ├── styles.css         # Estilos
│   ├── app.js             # Lógica de los juegos
│   ├── manifest.json      # Manifiesto PWA
│   ├── sw.js              # Service Worker
│   └── icons/             # Iconos de la aplicación
├── generar_apk.sh         # Script para generar APK
└── README.md              # Este archivo
```

## 🌐 Despliegue online

### GitHub Pages (Automático)
1. Ve a Settings > Pages en tu repositorio
2. Selecciona "Deploy from a branch"
3. Elige la rama `main` y carpeta `/www`
4. Tu PWA estará en: `https://tu-usuario.github.io/mi-apk`

### Netlify
1. Arrastra la carpeta `www/` a [Netlify](https://www.netlify.com/)
2. Obtendrás una URL automática

### Vercel
1. Conecta tu repositorio en [Vercel](https://vercel.com/)
2. Configura la carpeta de build como `www`

## 📱 Convertir a APK

Una vez que tu PWA esté online:

1. Ve a [PWA2APK](https://pwa2apk.com/) u otro servicio similar
2. Introduce la URL de tu PWA
3. Configura los detalles de la app:
   - Nombre: "Mi Primera APK de Juegos"
   - Package ID: com.miapp.juegos
   - Versión: 1.0
4. Genera y descarga tu APK
5. Instala en cualquier dispositivo Android

## 🎮 Juegos incluidos

### Juego de Memoria 🧠
- Encuentra las parejas de emojis
- Cuenta tus movimientos
- Interfaz táctil amigable

### Snake 🐍
- Controles con flechas del teclado
- Puntuación en tiempo real
- Gráficos modernos

### Quiz ❓
- Preguntas de cultura general
- Múltiples opciones
- Sistema de puntuación

## 🛠️ Tecnologías utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con gradientes y efectos
- **JavaScript**: Lógica de juegos y funcionalidad PWA
- **PWA**: Service Worker, Web App Manifest
- **Responsive Design**: Compatible con móviles y tablets

## 🔧 Personalización

Puedes personalizar fácilmente:

1. **Colores**: Modifica las variables CSS en `styles.css`
2. **Juegos**: Añade nuevos juegos en `app.js`
3. **Iconos**: Reemplaza los archivos en `icons/`
4. **Preguntas del Quiz**: Edita el array de preguntas en `app.js`

## 📋 Requisitos del sistema

- **Para desarrollo**: Navegador web moderno
- **Para APK**: Dispositivo Android 5.0+
- **Para hosting**: Cuenta gratuita en GitHub/Netlify/Vercel

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para aprender y crear tus propias apps.

## 🆘 Ayuda y soporte

- **Problemas con PWA**: Verifica que todos los archivos estén en la carpeta `www/`
- **APK no instala**: Habilita "Fuentes desconocidas" en Android
- **Juegos no funcionan**: Asegúrate de que JavaScript esté habilitado

## 🎉 ¡Disfruta tu primera APK!

¡Has creado tu primera aplicación Android! Ahora puedes:
- Instalarla en múltiples dispositivos
- Compartirla con amigos y familia
- Usar este proyecto como base para apps más complejas
- Aprender sobre desarrollo PWA y móvil

---

**¿Tienes preguntas?** Abre un issue en este repositorio y te ayudaremos. 🚀
