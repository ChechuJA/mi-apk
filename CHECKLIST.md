# Checklist de Verificación - Fix Pantalla Negra APK

## ✅ Pre-Merge Checklist

### Código
- [x] Eliminados todos los iframes de menu-local.html
- [x] Eliminados todos los data: URIs
- [x] Implementada carga directa de scripts
- [x] Base tag correcto para Android assets
- [x] Error handling robusto implementado
- [x] Cleanup de juegos implementado
- [x] Mobile controls integration verificada
- [x] Canvas management correcto
- [x] Logging detallado agregado
- [x] Fallback para DOMContentLoaded

### Testing Local
- [x] Archivo de test creado (test-menu-local.html)
- [x] Sin iframes en la solución (verificado)
- [x] Sin data: URIs (verificado)
- [x] Canvas ID consistente (gameCanvas)
- [x] Todos los juegos tienen registerGame

### Documentación
- [x] FIX_BLACK_SCREEN_ISSUE.md creado
- [x] SUMMARY.md creado
- [x] CHECKLIST.md creado (este archivo)
- [x] Comentarios en código explicativos
- [x] Código revisado sin issues

### Code Review
- [x] Primera revisión completada
- [x] Feedback atendido
- [x] Segunda revisión completada sin issues

## 🧪 Testing en APK (Post-Merge)

### Build
- [ ] Código mergeado a main
- [ ] APK compilada con workflow
- [ ] APK descargada de Actions

### Instalación
- [ ] APK instalada en dispositivo Android
- [ ] Permisos correctos
- [ ] Sin errores de instalación

### Funcionalidad Básica
- [ ] App abre sin pantalla negra
- [ ] Menú se muestra correctamente
- [ ] Banner de debug visible (development)
- [ ] Sin errores en consola debug

### Carga de Juegos
- [ ] Laberinto carga correctamente
- [ ] 4enRaya carga correctamente
- [ ] Arkanoid carga correctamente
- [ ] Memoria carga correctamente
- [ ] Serpiente carga correctamente
- [ ] Al menos 10 juegos probados

### Navegación
- [ ] Botón "Volver" funciona
- [ ] Transición suave menú ↔ juego
- [ ] Cleanup funciona (sin residuos)
- [ ] Canvas se limpia correctamente

### Mobile Controls
- [ ] Controles aparecen en móvil
- [ ] Controles responden al toque
- [ ] Controles se limpian al volver
- [ ] Controles no se superponen con juego

### Edge Cases
- [ ] Cargar múltiples juegos seguidos
- [ ] Volver rápidamente al menú
- [ ] Rotación de pantalla
- [ ] Background/foreground
- [ ] Batería baja

### Performance
- [ ] Carga rápida de menú
- [ ] Transiciones suaves
- [ ] Sin memory leaks
- [ ] CPU usage razonable

## 🐛 Issues Conocidos (Documentar si se encuentran)

### Durante Testing
- [ ] Issue 1: (descripción)
- [ ] Issue 2: (descripción)

## 📊 Métricas de Éxito

### Antes del Fix
- ❌ Pantalla negra: 100% de las veces
- ❌ Juegos funcionan: 0%
- ❌ Usuario puede jugar: No
- ❌ Rating: Usuario frustrado

### Después del Fix (Esperado)
- ✅ Pantalla negra: 0%
- ✅ Juegos funcionan: 100%
- ✅ Usuario puede jugar: Sí
- ✅ Rating: Usuario satisfecho

## 📝 Notas de Testing

### Dispositivos Recomendados para Test
1. Android 5.0 (API 21) - Mínimo soportado
2. Android 8.0 (API 26) - Versión común
3. Android 12.0 (API 31) - Versión reciente
4. Android 14.0 (API 34) - Versión más reciente

### Logs a Revisar
```bash
adb logcat | grep BrunoVegaWebView
```

Buscar:
- ✅ "Intentando leer asset menu-local.html"
- ✅ "Cargando asset inline via loadDataWithBaseURL"
- ✅ "[menu-local] Script loaded, initializing"
- ✅ "[menu-local] DOM ready, building menu"
- ✅ "[menu-local] Menu built with X games"
- ✅ "[menu-local] Launching game: [nombre]"
- ✅ "[menu-local] Game script loaded"
- ✅ "[menu-local] Game initialized successfully"

### Errores a NO Ver
- ❌ "onReceivedError"
- ❌ "No se pudo cargar"
- ❌ "Canvas not found"
- ❌ "registerGame not found"

## 🚀 Post-Deployment

### Comunicación
- [ ] Notificar al usuario que reportó el issue
- [ ] Actualizar issue con solución
- [ ] Cerrar issue
- [ ] Documentar en release notes

### Monitoreo
- [ ] Verificar feedback de usuarios
- [ ] Monitorear nuevos reports similares
- [ ] Verificar analytics (si hay)

## 🔄 Rollback Plan

Si hay problemas críticos:

1. **Identificar el problema**
   ```bash
   adb logcat | grep BrunoVegaWebView
   ```

2. **Rollback de código**
   ```bash
   git revert e85cb0e^..e85cb0e
   git push origin main
   ```

3. **Rebuild APK**
   - Trigger workflow build-real-apk.yml
   - Descargar APK anterior

4. **Notificar**
   - Informar a usuarios
   - Documentar issue
   - Crear fix alternativo

## ✅ Criterios de Aceptación

Para considerar este fix exitoso:

1. ✅ APK se instala sin errores
2. ✅ Menú se muestra (no pantalla negra)
3. ✅ Al menos 5 juegos diferentes cargan correctamente
4. ✅ Botón volver funciona
5. ✅ Mobile controls funcionan (en móvil)
6. ✅ Sin errores críticos en logs
7. ✅ Usuario puede jugar normalmente
8. ✅ Performance aceptable

## 📅 Timeline

- **2025-10-15**: Fix implementado
- **2025-10-15**: Code review completado
- **[Pendiente]**: Merge a main
- **[Pendiente]**: Build APK
- **[Pendiente]**: Testing en dispositivos
- **[Pendiente]**: Release
- **[Pendiente]**: Close issue

---

**Última actualización:** 2025-10-15
**Estado:** ✅ Pre-merge checklist completo, listo para merge
**Próximo paso:** Merge y testing en dispositivo real
