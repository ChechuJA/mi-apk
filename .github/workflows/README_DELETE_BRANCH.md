# 🗑️ Automatic Branch Deletion Workflow

Este workflow implementa la eliminación automática de ramas después de un merge exitoso a `main`.

## 🎯 Propósito

Mantener el repositorio limpio eliminando automáticamente las ramas de características (`feature branches`) después de que han sido fusionadas exitosamente con la rama principal.

## ⚡ Funcionamiento

### Trigger (Disparador)
- **Evento**: `pull_request` con tipo `closed`
- **Rama objetivo**: `main`
- **Condición**: Solo se ejecuta si el PR fue **merged** (no solo cerrado)

### Proceso
1. **Verificación de seguridad**: Comprueba que la rama no es una rama protegida
2. **Eliminación**: Ejecuta `git push origin --delete <branch_name>`
3. **Reporte**: Genera un resumen en GitHub Actions
4. **Comentario**: Añade un comentario automático en el PR

### Ramas Protegidas
Las siguientes ramas **NO** se eliminan automáticamente:
- `main`
- `master`
- `develop`
- `development`

## 🛡️ Seguridad

- ✅ Solo funciona con PRs **merged** (no cerrados)
- ✅ Verifica ramas protegidas antes de eliminar
- ✅ Usa `GITHUB_TOKEN` con permisos limitados
- ✅ Proporciona logs detallados de cada acción

## 📝 Beneficios

- 🧹 **Repositorio limpio**: Elimina ramas obsoletas automáticamente
- 🚀 **Automatización**: No requiere intervención manual
- 📊 **Transparencia**: Informa sobre cada eliminación
- ⚠️ **Seguridad**: Protege ramas importantes

## 🎮 Ejemplo de Uso

Cuando un PR es merged a `main`:

```
PR #123: "Añadir nuevo juego de memoria" 
Rama: feature/memory-game
↓
Merge exitoso a main
↓
Workflow ejecutado automáticamente
↓
Rama feature/memory-game eliminada
↓
Comentario añadido al PR
```

## 🔧 Personalización

Para modificar el comportamiento:

1. **Cambiar ramas protegidas**: Edita el array `PROTECTED_BRANCHES` en el workflow
2. **Modificar el mensaje**: Cambia el `body` en el step de comentario
3. **Añadir condiciones**: Modifica la condición `if` del job

## 📋 Resolución de Issue

Este workflow resuelve el **Issue #10**:
- ✅ Elimina automáticamente las ramas después del merge
- ✅ Mantiene el repositorio limpio
- ✅ Facilita el trabajo futuro desde `main` actualizado

---

*Workflow creado para mantener el repositorio `ChechuJA/mi-apk` organizado y limpio.*