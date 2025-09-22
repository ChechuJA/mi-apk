# 🧪 APK Testing Pipelines

Este repositorio incluye pipelines automatizados para validar los APKs antes de su liberación, respondiendo al issue #6 sobre errores de instalación.

## 🚀 Workflows Disponibles

### 1. ⚡ Quick APK Validation (`quick-validation.yml`)
**Propósito**: Validación rápida básica del APK

**Se ejecuta**:
- En cada push a `main` que modifique archivos APK
- En Pull Requests
- Manualmente desde GitHub Actions

**Validaciones**:
- ✅ Existencia y tamaño del archivo APK
- ✅ Formato válido de Android Package
- ✅ Estructura interna (AndroidManifest.xml, classes.dex, resources.arsc)
- ✅ Integridad de archivos

**Tiempo estimado**: ~2-3 minutos

### 2. 🧪 APK Testing Pipeline (`apk-testing.yml`)
**Propósito**: Testing completo con emuladores Android

**Se ejecuta**:
- En cada push a `main` que modifique archivos APK
- En Pull Requests
- Manualmente desde GitHub Actions

**Validaciones**:
- ✅ Análisis completo de APK
- ✅ Pruebas de instalación en Android 9 y 11
- ✅ Validación de permisos y seguridad
- ✅ Prueba de lanzamiento de la aplicación
- ✅ Limpieza y desinstalación

**Tiempo estimado**: ~10-15 minutos

### 3. 🐳 Docker APK Testing (`docker-testing.yml`)
**Propósito**: Testing en contenedor Docker como solicité el usuario

**Se ejecuta**:
- En cada push a `main` que modifique archivos APK
- Manualmente con niveles de testing configurables
- En cambios a archivos Docker

**Validaciones**:
- ✅ Ambiente Docker Ubuntu 22.04
- ✅ Android SDK y herramientas
- ✅ Análisis estructural completo
- ✅ Validación de formato y signatures
- ✅ Diagnóstico de problemas comunes

**Tiempo estimado**: ~5-8 minutos

## 📊 Interpretación de Resultados

### ✅ Success (Verde)
- APK pasa todas las validaciones
- Seguro para instalación en dispositivos
- No hay problemas críticos detectados

### ❌ Failure (Rojo)  
- APK tiene problemas que impedirían la instalación
- Posibles causas:
  - Archivo APK corrupto o faltante
  - Estructura interna malformada
  - Problemas críticos de formato

### ⚠️ Warning (Amarillo)
- APK probablemente funcional pero con advertencias
- Posibles mejoras disponibles
- Revisar logs para detalles

## 🛠️ Uso Manual

### Ejecutar validation rápida:
1. Ve a `Actions` en GitHub
2. Selecciona "⚡ Quick APK Validation"
3. Click "Run workflow"

### Ejecutar testing completo:
1. Ve a `Actions` en GitHub  
2. Selecciona "🧪 APK Testing Pipeline"
3. Click "Run workflow"

### Ejecutar testing Docker:
1. Ve a `Actions` en GitHub
2. Selecciona "🐳 Docker APK Testing"
3. Selecciona nivel de testing:
   - `basic`: Validaciones esenciales
   - `full`: Testing completo
   - `analysis-only`: Solo análisis estático

## 🔍 Debugging de Problemas

### Si el APK falla las validaciones:

1. **Revisa los logs detallados** en la pestaña Actions
2. **Problemas comunes**:
   - APK no encontrado: Verificar ruta `android-apk/releases/latest/`
   - Formato inválido: Re-generar APK con PWA Builder
   - Estructura malformada: Verificar proceso de build

### Información útil en los logs:
- Tamaño exacto del archivo
- Lista de archivos internos
- Errores específicos de instalación
- Compatibilidad con versiones Android

## 📈 Beneficios del Pipeline

### Para Desarrolladores:
- ✅ Detección temprana de problemas
- ✅ Validación automatizada antes de releases
- ✅ Feedback inmediato sobre cambios

### Para Usuarios:
- ✅ APKs más confiables
- ✅ Menor probabilidad de errores de instalación
- ✅ Mejor experiencia de usuario

### Para el Proyecto:
- ✅ Cumple con el requisito del issue #6
- ✅ Previene "basura" en dispositivos móviles
- ✅ Workflow automatizado y documentado

## 🚨 Respuesta al Issue #6

> "Por favor crea las actions o pipelines necesarias con Dockers o lo que creas conveniente para probarla antes de bajarme basura al movil"

**✅ Implementado**:
- 3 pipelines de testing diferentes
- Validación Docker específicamente solicitada
- Prevención de APKs defectuosos
- Testing automatizado antes de releases
- Documentación completa de errores comunes

## 📋 Checklist de Validación

Antes de cada release, los pipelines verifican:

- [ ] APK existe y tiene tamaño esperado (~930KB)
- [ ] Formato Android Package válido
- [ ] AndroidManifest.xml presente y válido
- [ ] classes.dex y resources.arsc incluidos
- [ ] Instalación exitosa en Android 9+
- [ ] Aplicación puede lanzarse correctamente
- [ ] Sin errores críticos de estructura
- [ ] Compatibilidad con arquitecturas múltiples

---

**💡 Resultado**: Los usuarios ahora pueden estar seguros de que cada APK ha pasado múltiples validaciones antes de estar disponible para descarga, eliminando la preocupación de "basura" en sus dispositivos móviles.